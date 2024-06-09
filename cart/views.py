from django.shortcuts import render, redirect, get_object_or_404 
from store.models import Product, CompareList, Wishlist
from .models import Cart, CartItem, ApplyCouponCode
from frontend.forms import ShippingEstimateForm
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.http.response import JsonResponse
import datetime, json,math
from accounts.models import Country, State, Account, AddressBook

from django.template.loader import get_template
from django.template import Context, Template,RequestContext
import hashlib
from random import randint
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from hornbill import settings
from django.urls import reverse
from django.contrib import messages
import logging, traceback
from django.views.decorators.csrf import csrf_exempt
from addons.models import Coupon
from django.utils import timezone
from common import _cart_id, calculate_coupon_price
from django.core.cache import cache


def clear_cache():
    cache.clear()
        

def _cart_item_details(request, total=0, tax = 0, grand_total=0, quantity=0, cart_items =None):    
    discount_type=discount=grand_total = None
    cart_id_cookie = request.COOKIES.get('cart_key')   
    if cart_id_cookie is None:
         cart_id_cookie = request.COOKIES.get('cart_key',None)
    try:    
        cart = Cart.objects.get(cart_id = cart_id_cookie)        
        cart_items = CartItem.objects.filter(cart = cart, status = True)             
       
        for item in cart_items:
            total += (item.product.sale_price * item.quantity) 
            quantity += item.quantity
        tax = (settings.GST_RATE*total)/100
        grand_total = total+tax
        discount_type, discount, grand_total = calculate_coupon_price(request, grand_total)

    except ObjectDoesNotExist:
        pass
    
    # pass data to template
    context = {
        'total' : total,
        'quantity' : quantity,
        'cart_items' : cart_items,
        'tax' : tax,
        'discount_type':discount_type,
        'discount': discount,
        'grand_total' : grand_total,
        }
    return dict(context)

def apply_coupon_code(request):
    try:
        coupon_code = request.POST.get('coupon_code')
        current_date_time = timezone.now()
        cart_instance = Cart.objects.get(cart_id = _cart_id(request))     
        coupon_instance = Coupon.objects.filter(code=coupon_code, status=True).first()         
        if coupon_instance is not None:
            if current_date_time > coupon_instance.valid_from and current_date_time < coupon_instance.valid_to:
                coupon = ApplyCouponCode.objects.create(
                    cart = cart_instance,
                    coupon = coupon_instance,
                    user = request.user if request.user.is_authenticated else None,
                )
                coupon.save()
                return JsonResponse({'status':True}, status=200)   
            else:
                return JsonResponse({'status':False, 'message':'Coupon code is expired.'}, status=404)
        else:
            return JsonResponse({'status':False, 'message':'Coupon code not exists.'}, status=404)
    
    except Exception as e:
        return JsonResponse({'status':False, 'message':f"{e}"}, status=404)


# add product to cart list, if product id exist in cart list then increase product quantity
def add_to_cart(request,product_id):
    # return HttpResponse(request.COOKIES.get('cart_key'))    
        product = Product.objects.get(id=product_id)
        
        cart_key = request.COOKIES.get('cart_key')     
        if not cart_key:
            request.session.create()         
            cart_key = request.session.session_key
            
        try:
            cart = Cart.objects.get(cart_id=cart_key)
        except Cart.DoesNotExist:
            cart = Cart.objects.create(
                cart_id = cart_key
            )
        cart.save()        
        try:
            cart_item = CartItem.objects.get(product = product, cart = cart)
            cart_item.quantity +=1
            cart_item.save()      
        except CartItem.DoesNotExist:
            cart_item = CartItem.objects.create(
                product = product,
                quantity = 1,
                cart = cart,
            )
            cart_item.save()
        return_data = {
            'status':True,
            'message':"Successfully added to cart.",
            'cart_key':cart_key
            }
        response = JsonResponse(return_data,status=200)
        if not _cart_id(request):
            max_age = 365 * 24 * 60 * 60
            expires = datetime.datetime.strftime(
                datetime.datetime.utcnow() + datetime.timedelta(seconds=max_age), "%a, %d-%b-%Y %H:%M:%S GMT",)
            response.set_cookie('cart_key', cart_key, expires=expires)
        return response
    
def add_to_cart_view(request):
        body = json.loads(request.body)
        
        cart_key = request.COOKIES.get('cart_key')     
        if not cart_key:
            request.session.create()         
            cart_key = request.session.session_key
            
        
        product = Product.objects.get(id=body['product_id'])    
        try:
            cart = Cart.objects.get(cart_id=cart_key)
        except Cart.DoesNotExist:
            cart = Cart.objects.create(
                cart_id = cart_key
            )
        cart.save()
        
        try:
            cart_item = CartItem.objects.get(product = product, cart = cart)
            cart_item.quantity +=int(body['item_qty'])
            cart_item.save()      
        except CartItem.DoesNotExist:
            cart_item = CartItem.objects.create(
                product = product,
                quantity = int(body['item_qty']),
                cart = cart,
            )
            cart_item.save()
        response = JsonResponse({'status':True,'message':"Successfully added to cart."},status=200)
        if not _cart_id(request):
            max_age = 365 * 24 * 60 * 60
            expires = datetime.datetime.strftime(
                datetime.datetime.utcnow() + datetime.timedelta(seconds=max_age), "%a, %d-%b-%Y %H:%M:%S GMT",)
            response.set_cookie('cart_key', cart_key, expires=expires)
        return response
    
def add_to_compare(request):
        body = json.loads(request.body)
        product = Product.objects.get(uuid=body['pro_uuid']) 
        
        pro_id = product.id
        # if request.user.is_authenticated:
        total = CompareList.objects.filter(cart_id=_cart_id(request)).count()
        if int(total) > 3:            
            if CompareList.objects.filter(product=pro_id, cart_id=_cart_id(request)).exists():
                return JsonResponse({'status':False, 'message':'Allready exists in compare product list'}, status=404)
            return JsonResponse({'status':False, 'message':'Allow only 3 product to compare'}, status=404)
        try:
            product = Product.objects.get(id=pro_id)
            compare_product = CompareList.objects.create(
                product = product,
                cart_id = _cart_id(request),
            )
            compare_product.save() 
            return JsonResponse({'status':True, 'message':'Add to compare successfully'}, status=200)
        except Product.DoesNotExist:
            return JsonResponse({'status':False, 'message':'Product does not exists'}, status=404)
        # else:
        #     return JsonResponse({'status':False, 'message':'Unauthorized access'}, status=401)
        
def add_to_wishlist(request):
        body = json.loads(request.body)
        product = Product.objects.get(uuid=body['pro_uuid'])        
        pro_id = product.id
        if request.user.is_authenticated:                       
            if Wishlist.objects.filter(product=pro_id, user=request.user).exists():
                return JsonResponse({'status':False, 'message':'Allready exists in wishlist product list'}, status=404)                
            try:
                product = Product.objects.get(id=pro_id)
                wishlist = Wishlist.objects.create(
                    product = product,
                    user = request.user,
                )
                wishlist.save() 
                return JsonResponse({'status':True, 'message':'Add to wishlist successfully'}, status=200)
            except Product.DoesNotExist:
                return JsonResponse({'status':False, 'message':'Product does not exists'}, status=404)
        else:
            return JsonResponse({'status':False, 'message':'Unauthorized access'}, status=401)

def remove_compare_product(request):
        body = json.loads(request.body)
        cpId = body['id']
        try:
          CompareList.objects.get(pk=cpId).delete()          
        except CompareList.DoesNotExist:
          return JsonResponse({'status':False, 'message':'Not exists in compare product list'}, status=404)
        return JsonResponse({'status':True, 'message':'Deleted compare product'}, status=200)

def remove_wishlist_product(request):
        body = json.loads(request.body)
        cpId = body['id']
        try:
          Wishlist.objects.get(pk=cpId).delete()          
        except Wishlist.DoesNotExist:
          return JsonResponse({'status':False, 'message':'Not exists in wishlist product list'}, status=404)
        return JsonResponse({'status':True, 'message':'Deleted wishlist product'}, status=200)



# decrease cart item quantity by product id
def decrease_quantity(request, product_id):
    try:
        cart = Cart.objects.get(cart_id=_cart_id(request))
        product = get_object_or_404(Product, id=product_id)
        cart_item = CartItem.objects.get(product=product, cart=cart)
        
        if cart_item.quantity > 1:
            cart_item.quantity -= 1
            cart_item.save()
        else:
            cart_item.delete()
    except ObjectDoesNotExist:
      return JsonResponse({'status':False,'message':"Cart item does not exists."},status=200)  
   
    return JsonResponse({'status':True,'message':"Successfully decrease cart item quantity."},status=200)  
    
#remove cart item by product id
def remove_cart_item(request, product_id):
    # return HttpResponse(product_id)
    try:
        cart = Cart.objects.get(cart_id = _cart_id(request))
        product = get_object_or_404(Product, id=product_id)
        cart_item = CartItem.objects.get(product=product, cart=cart)  
        cart_item.delete()
        return JsonResponse({'status':True,'message':"Cart item deleted successfully."},status=200) 
    except ObjectDoesNotExist:
        return JsonResponse({'status':False,'message':"Cart item does not exist."},status=200)
    
     


#get cart product list
def cart(request):
    if request.method == 'POST':
        form = ShippingEstimateForm(request.POST)
        if form.is_valid():
            country = Country.objects.get(id = request.POST['country'])
            state = State.objects.get(id = request.POST['state'])
            # return HttpResponse(request.POST['country'])       
            if int(request.POST['country']) != 101:                
                html = "<p>There is one shipping rate available for "+request.POST['zip_code']+", "+state.name+", "+country.name+".<p> <ul class='tt-list-dot list-dot-large'><li><a href='#'> International Shipping at Rs. 1,200.00 </a></li></ul>"
            else:                
                html = "<p>There is one shipping rate available for "+request.POST['zip_code']+", "+state.name+", "+country.name+". <p> <ul class='tt-list-dot list-dot-large'><li><a href='#'> Free Shipping at Rs. 0.00 </a></li></ul>"        
            return JsonResponse({'status': True, 'html':html}, status=200)
        else:
            return JsonResponse({'status': False, 'errors':form.errors}, status=200) 
    else:
        # return HttpResponse(request.COOKIES.get('cart_key'))    
        context = _cart_item_details(request)
        form = ShippingEstimateForm() 
        context['form'] = form
        # return HttpResponse(context)   
        return render(request, 'frontend_tmps/cart.html', context)


def shipping_estimate(request):
 pass

def cart_item_list(request):    
    context = _cart_item_details(request)
    return render(request, 'frontend_tmps/includes/header/objects/cart-obj-ajax.html', context)

def cart_item_page(request):
    # return HttpResponse(request)
    context = _cart_item_details(request)
    return render(request, 'frontend_tmps/ajax-content/cart-item-list.html', context)

def order_summary(request):
    # return HttpResponse(request)
    context = _cart_item_details(request)
    return render(request, 'frontend_tmps/ajax-content/ajax-order-summary.html', context)

def get_address_info(request):    
    if request.user.is_authenticated:
        shipping = AddressBook.objects.filter(user=request.user,addr_type='shipping')
    else:
        user_cookie = _cart_id(request)        
        shipping =AddressBook.objects.filter(user_cookie=user_cookie,addr_type='shipping')
    return shipping
        
def checkout(request):
     context = _cart_item_details(request)
     
    #  if request.user.is_authenticated:
    #     shipping_adds = AddressBook.objects.filter(user=request.user,addr_type='shipping')
    #  else:
    #     user_cookie = _cart_id(request)        
    #     shipping_adds =AddressBook.objects.filter(user_cookie=user_cookie,addr_type='shipping')
           
     shipping = get_address_info(request)
     print(shipping)
    #  context['payu']=payu_request_data(request)
     context['shipping']=shipping if shipping else None
     
     data = {}
    #  txnid = get_transaction_id()
    #  hash_ = generate_hash(request, txnid)
    #  hash_string = get_hash_string(request, txnid)
     # use settings file to store constant values.
     # # use test URL for testing
    #  data["action"] = settings.PAYMENT_URL_TEST
    #  data["amount"] = float(context['grand_total'])
    #  data["productinfo"]  = settings.PAID_FEE_PRODUCT_INFO
    #  data["key"] = settings.KEY
    #  data["salt"] = settings.SALT
    #  data["txnid"] = txnid
    #  data["hash"] = hash_
    #  data["hash_string"] = hash_string
    #  data["firstname"] = shipping.first_name+' '+shipping.last_name
    #  data["email"] = shipping.email
    #  data["phone"] = shipping.contact_mobile1
    #  data["service_provider"] = settings.SERVICE_PROVIDER
    #  data["furl"] = request.build_absolute_uri(reverse("payment_failure"))
    #  data["surl"] = request.build_absolute_uri(reverse("payment_success"))
    #  data["curl"] = request.build_absolute_uri(reverse("payment_cancel"))     
     context['data']=data
     
    #  return HttpResponse(context['shipping'].values())
     return render(request, 'frontend_tmps/checkout.html',context)
 
def checkout_ajax(request):
     context = _cart_item_details(request)  
     return render(request, 'frontend_tmps/ajax-content/checkout-summary.html', context)
 
# generate the hash
def generate_hash(request, txnid):
    try:
        # get keys and SALT from dashboard once account is created.
        # hashSequence = "key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10"
        hash_string = get_hash_string(request,txnid)
        generated_hash = hashlib.sha512(hash_string.encode()).hexdigest().lower()
        return generated_hash
    except Exception as e:
        # log the error here.
        logging.getLogger("error_logger").error(traceback.format_exc())
        return None

# create hash string using all the fields
def get_hash_string(request, txnid):
    shipping = get_address_info(request)
    # return HttpResponse(shipping.first_name)
    hash_string = settings.KEY+"|"+txnid+"|"+str(float(settings.PAID_FEE_AMOUNT))+"|"+settings.PAID_FEE_PRODUCT_INFO+"|"
    hash_string += shipping.first_name+' '+shipping.last_name+"|"+shipping.email+"|"+shipping.contact_mobile1+"|"+settings.SERVICE_PROVIDER+"|"+request.build_absolute_uri(reverse("payment_failure"))+"|"+request.build_absolute_uri(reverse("payment_success"))+"|"+request.build_absolute_uri(reverse("payment_cancel"))+"|"
    hash_string += "|||||"+settings.SALT

    return hash_string

# generate a random transaction Id.
def get_transaction_id():
    hash_object = hashlib.sha512(str(randint(0,9999)).encode())
    # take approprite length
    txnid = hash_object.hexdigest().lower()[0:32]
    return txnid

# no csrf token require to go to Success page. 
# This page displays the success/confirmation message to user indicating the completion of transaction.
@csrf_exempt
def payment_success(request):
    data = {}
    return render(request, "frontend_tmps/success.html", data)

# no csrf token require to go to Failure page. This page displays the message and reason of failure.
@csrf_exempt
def payment_failure(request):
    data = {}
    return render(request, "frontend_tmps/failure.html", data)

# no csrf token require to go to Failure page. This page displays the message and reason of failure.
@csrf_exempt
def payment_cancel(request):
    data = {}
    return render(request, "frontend_tmps/cancel.html", data)


def payu_request_data(request):
        
    MERCHANT_KEY = settings.MERCHANT_KEY
    key=settings.KEY
    SALT = settings.SALT
    # PAYU_BASE_URL = settings.PAYU_BASE_URL
    
    action = ''
    posted={}
    context = _cart_item_details(request) 
    # return HttpResponse(context.items())
    # Merchant Key and Salt provided y the PayU.
    # for i in request.POST:
	#     posted[i]=request.POST[i]
 
    hash_object = hashlib.sha256(b'randint(0,20)')
    txnid=hash_object.hexdigest()[0:20]
    hashh = ''
    posted['txnid']=txnid
    posted['amount'] =  context['grand_total']
    posted['productinfo'] = "Product Information"
    posted['firstname'] =  'test', 
    posted['email'] =  'sainipiyosh367@gamil.com', 
    posted['phone'] =  "9557000873",
    posted['surl'] =  reverse('checkout'),
    posted['furl'] =  reverse('checkout'),
	# posted['lastname'] =  $r->ship_last_name,
	# posted['address1'] =  $r->ship_street_address,	
	# posted['city'] = $r->ship_city,
	# posted['state'] = $r->ship_state,
	# posted['country'] = $r->ship_country,
	# posted['zipcode']= $r->ship_zip_code,
    
    hashSequence = "key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10"
    posted['key']=key
    hash_string=''
    hashVarsSeq=hashSequence.split('|')
    for i in hashVarsSeq:
        try:
            hash_string+=str(posted[i])
        except Exception:         
            hash_string+=''
        hash_string+='|'
    hash_string+=SALT
    hashh = hashlib.sha512(hash_string.encode()).hexdigest().lower()
    # return HttpResponse(hashh)
    action =settings.PAYMENT_URL_TEST
    if(posted.get("key")!=None and posted.get("txnid")!=None and posted.get("productinfo")!=None and posted.get("firstname")!=None and posted.get("email")!=None):
        context = {"posted":posted,"hashh":hashh,"MERCHANT_KEY":MERCHANT_KEY,"txnid":txnid,"hash_string":hash_string,"action":"https://test.payu.in/_payment" }
    else:
        context =  {"posted":posted,"hashh":hashh,"MERCHANT_KEY":MERCHANT_KEY,"txnid":txnid,"hash_string":hash_string,"action":"." }
    return context
    