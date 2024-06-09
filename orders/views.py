from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.template.loader import get_template
import http.client
import datetime, json, short_url, razorpay
from accounts.models import AddressBook
from cart.models import CartItem, Cart, ApplyCouponCode
from cart.views import _cart_id, _cart_item_details
from store.models import Product
from .form import OrderForm
from .models import Order, Payment, OrderProduct
from .task import sendMail
from hornbill import settings
from common import generate_random_number, Generate_pdf, ordered_data


def payment(request):
    body = json.loads(request.body)  
    order = Order.objects.get(user=request.user, is_ordered=False,order_number=body['orderId'])
    payment = Payment(
        user = request.user,
        payment_id = body['transId'],
        payment_method = body['payment_method'],
        amount_paid = order.order_total,
        status = body['status'], 
        payer_email= body['payer_email'],
        payer_fullname= body['payer_fullname'],
        payer_id= body['payer_id'],       
        payer_address= body['payer_address'],
        currency_code= body['currency_code'],
    )
    payment.save()
    
    order.payment = payment
    order.is_ordered = True
    order.save()
    
    cart_items = CartItem.objects.filter(user= request.user)
    # return HttpResponse(cart_items)
    for item in cart_items:
        orderProduct = OrderProduct()
        orderProduct.order = order
        orderProduct.payment = payment
        orderProduct.user = request.user
        orderProduct.product = item.product
        orderProduct.quantity = item.quantity
        orderProduct.product_price = item.product.sale_price
        orderProduct.ordered = True
        orderProduct.save()
        #Add variation inn orderProduct
        
        # cart_item = CartItem.objects.get(id=item.id)
        # product_variation = cart_item.variation.all()
        # orderProduct = OrderProduct.objects.get(id=orderProduct.id)
        # orderProduct.variation.set(product_variation)
        # orderProduct.save()
        
        # Reduse the quantity of sold product
        product = Product.objects.get(id=item.product_id)
        product.quantity -= item.quantity
        product.save()
    # Delete cart items
    CartItem.objects.filter(user=request.user).delete()
    
    #Reset Password
   
    sendMail.delay(request, order, body['payer_email'])
    #End Reset Password
        
    data = {
         'order_number':order.order_number,
         'tranId': payment.payment_id
    }     
    return JsonResponse(data)

# def sendMail(request, order, to_user):
#     mail_subject = "Thank you for your order"
#     message = render_to_string('frontend_tmps/emails/order_recieved_email.html',{
#         'user':request.user if request.user.is_authenticated else None,
#         'order': order
#         })
#     to_mail = request.user.email if request.user.is_authenticated else to_user
#     send_email = EmailMessage(mail_subject, message, to=[to_mail])
#     send_email.send()

def order_event(request, **mail_data):
    
    # order_placed(request, mail_data['order_id'])
    context = ordered_data(mail_data['order_id'])
    template_path = 'frontend_tmps/user_profile/invoice-pdf.html'

    template = get_template(template_path)
    html_template = template.render(context)
    Generate_pdf.save_invoice_pdf(request, html_template, mail_data['order_id'])
    # order_received(request)
    sendMail.delay(**mail_data)

# Create your views here.
def place_order(request,total= 0,quantity = 0):    
    current_user = request.user if request.user.is_authenticated else None 
    cart = Cart.objects.get(cart_id = _cart_id(request))        
    # cart_items = CartItem.objects.filter(cart = cart, status = True) 

    cart_items = _cart_item_details(request)
       
    if request.method == "POST":
        # return HttpResponse(request.POST)        
        form = OrderForm(request.POST)        
        if form.is_valid():
            addresbook = AddressBook.objects.get(pk=request.POST.get('address_book'))
            apply_coupon = ApplyCouponCode.objects.filter(cart__id=cart.id).order_by('-id').first()

            try:
                data = Order()
                data.user = current_user
                data.address_book = addresbook
                data.payment_type = request.POST.get('payment_type')          
                # data.order_note = form.cleaned_data['order_note']
                data.order_total = cart_items['grand_total']
                data.tax = cart_items['tax']
                data.apply_coupon = apply_coupon
                data.discount = cart_items['discount']
                data.quantity = cart_items['quantity']
                data.ip = request.META.get('REMOTE_ADDR')
                data.save()
             
                order_number = generate_random_number(data.id, 'OR')
                data.order_number = order_number
                data.is_ordered = True
                data.save()

                
                for item in cart_items['cart_items']:
                    orderProduct = OrderProduct()
                    orderProduct.order = data
                    orderProduct.payment = None
                    orderProduct.user = request.user if request.user.is_authenticated else None
                    orderProduct.product = item.product
                    orderProduct.quantity = item.quantity
                    orderProduct.product_price = item.product.sale_price
                    orderProduct.ordered = True
                    orderProduct.save()
                    #Add variation inn orderProduct
                
                mail_data = {
                    'user_name':request.user.username if request.user.is_authenticated else f"{addresbook.first_name} {addresbook.last_name}",
                    'order_id': data.order_number,
                    'email': request.user.email if request.user.is_authenticated else addresbook.email,
                    'contact':request.user.mobile_no if request.user.is_authenticated else addresbook.contact_mobile1
                }
                
               
                razorpay_context = {}
                if request.POST.get('payment_type') == 'razorpay':

                    client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
                    razorpay_order = client.order.create(
                        {"amount": int(cart_items['grand_total']) * 100, "currency": "INR", "payment_capture": "1"}
                    )
                    

                    # {'id': 'order_JkMfnwah93x02v', 'entity': 'order', 'amount': 2574600, 'amount_paid': 0, 'amount_due': 2574600, 'currency': 'INR', 'receipt': None, 'offer_id': None, 'status': 'created', 'attempts': 0, 'notes': [], 'created_at': 1655862539}
                    # return JsonResponse({"status":False,"message":"Order placed successfully."},status=401)
                    

                    order = Order.objects.get(order_number=data.order_number)
                    payment = Payment(
                        user = request.user if request.user.is_authenticated else None,                        
                        payment_method = 'razorpay',
                        amount_paid = cart_items['grand_total'],
                        status = razorpay_order['status'],
                        payer_email= mail_data['email'],
                        payer_fullname= mail_data['user_name'],
                        currency_code= razorpay_order['currency'],
                        provider_order_id= razorpay_order['id'],
                    )
                    payment.save()
                    
                    order.payment = payment
                    order.is_ordered = True
                    order.save()                                   

                    razorpay_context = {
                        'provider_order_id': razorpay_order['id'],
                        'amount': cart_items['grand_total'],
                        'name': mail_data['user_name'],
                        'email': mail_data['email'],
                        'contact':mail_data['contact'],
                        'callback_url': '/order/razorpay/callback_url/',
                        'razorpay_key': settings.RAZORPAY_KEY_ID,
                    }
                else:                    
                    order_event(request, **mail_data)

                return JsonResponse({'status':True,'message':"Order placed successfully.","order_number":data.order_number,"payment_type":request.POST.get('payment_type'), "context":razorpay_context},status=201)
            except Exception as e:
              return JsonResponse({'status':False, 'errors':f"{e}"},status=404)
        else:        
            return JsonResponse({'status':False, 'errors':form.errors},status=404)
    else:
        return redirect('checkout')

def verify_signature(response_data):
        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        return client.utility.verify_payment_signature(response_data)

@csrf_exempt
def razorpay_callback(request):  
    if "razorpay_signature" in request.POST:
        payment_id = request.POST.get("razorpay_payment_id", "")
        provider_order_id = request.POST.get("razorpay_order_id", "")
        signature_id = request.POST.get("razorpay_signature", "")

        payment = Payment.objects.get(provider_order_id=provider_order_id)
        payment.payment_id = payment_id
        payment.signature_id = signature_id
        payment.save()
        
        if verify_signature(request.POST):
            payment.status = 'Success'
            payment.save()
            
            context = {}
            for item in payment.relOrderPayment.all():
                context = {
                    'user_name':request.user.username if request.user.is_authenticated else f"{item.address_book.first_name} {item.address_book.last_name}",
                    'order_id': item.order_number,
                    'email': request.user.email if request.user.is_authenticated else item.address_book.email,
                    'contact':request.user.mobile_no if request.user.is_authenticated else item.address_book.contact_mobile1
                }
            
            order_event(request, **context)

            return render(request, "frontend_tmps/success.html", context={"status": payment.status})
        else:
            payment.status = 'Failure'
            payment.save()
            return render(request, "frontend_tmps/failure.html", context={"status": payment.status})
    else:
        payment_id = json.loads(request.POST.get("error[metadata]")).get("payment_id")
        provider_order_id = json.loads(request.POST.get("error[metadata]")).get(
            "order_id"
        )
        payment = Payment.objects.get(provider_order_id=provider_order_id)
        payment.payment_id = payment_id
        payment.status = 'Failure'
        payment.save()
        return render(request, "frontend_tmps/failure.html", context={"status": payment.status})



def _order_info(order_number):
    try:
      order = Order.objects.get(order_number=order_number, is_ordered = True)
      order_product = OrderProduct.objects.filter(order_id = order.id)
      context = {
          'order':order,
          'order_product':order_product,
          'order_number':order.order_number,
          'mobile_number':order.address_book.contact_mobile1,
          'email':order.address_book.email,
          }
    
      return dict(context)      
    except Exception as e:
        pass

def order_complete(request, order_number):
    # order_number = short_url.decode_url(order_number)
    try:
        context = _order_info(order_number)
        return render(request, 'frontend_tmps/order_complete.html',context)

    except Exception as e:
      return redirect('home')

def order_placed(request, order_number):
    conn = http.client.HTTPSConnection(settings.MSG91_API_DOMAIN)

    context = _order_info(order_number)    
    order_id = context['order_number']    
    mobile = "91"+str(context['mobile_number'])

    payload = {
        'flow_id': "6102c42ba5b3196cf7117df4",
        'mobiles': mobile,        
        'order_id': order_id,        
    }
    
    payload = json.dumps(payload)
    headers = {
        'authkey': settings.MSG91_AUTH_KEY,
        'content-type': "application/JSON"
        }
    conn.request("POST", settings.MSG91_API_ENDPOINT, payload, headers)
    res = conn.getresponse()
    data = res.read()
    # return HttpResponse(data.decode("utf-8"))
    print(data.decode("utf-8"))
      
# def order_received(request):
#     conn = http.client.HTTPSConnection(settings.MSG91_API_DOMAIN)
#     payload = "{\n  \"flow_id\": \"6102c51ca350700418339bb5\",\n  \"mobiles\": \"918810597853\",\n  \"product_name\": \"product_name\",\n  \"order_id\": \"order_id\",\n  \"pay_type\":\"pay_type\",\n  \"amount\":\"amount\"\n}"
#     headers = {
#         'authkey': settings.MSG91_AUTH_KEY,
#         'content-type': "application/JSON"
#         }
#     conn.request("POST", settings.MSG91_API_ENDPOINT, payload, headers)
#     res = conn.getresponse()
#     data = res.read()
#     print(data.decode("utf-8"))


      
    