from decimal import Context
from django.http.response import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from django.contrib import messages,auth
from django.contrib.auth.decorators import login_required
import base64,uuid
from django.core.files.base import ContentFile
from .forms import RegisterForms, UserForm, UserProfileForm, ResetPasswordForms,BillingForm,ShippingForm
from .models import Account, AddressBook, Country, State,City, UserProfile
from orders.models import Order, OrderProduct, Order
from cart.models import Cart, CartItem
from store.models import CompareList, Wishlist
from cart.views import _cart_id
import requests, json
from re import search
from common import exception_details


import os
from django.conf import settings
from xhtml2pdf import pisa
from django.contrib.staticfiles import finders

#for email verification
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage

#create pdf 
from weasyprint import HTML, CSS
from django.template.loader import get_template
from hornbill import settings
from common import Generate_pdf

from django.template import Template, Context, loader

# Create your views here.
#ragister

def register(request): 
    form_data = None  
    try:
        if request.method == "POST":
            try:
                form_data = RegisterForms(request.POST)        
                if form_data.is_valid():
                    first_name = form_data.cleaned_data['first_name']
                    last_name = form_data.cleaned_data['last_name']
                    email = form_data.cleaned_data['email']
                    password = form_data.cleaned_data['password']
                    username = email.split('@')[0]
                    user = Account.objects.create_user(first_name,last_name,email,username,password)
                    user.save()
                    #Email verification
                    current_site = get_current_site(request)
                    mail_subject = "Please verify your email address"
                    message = render_to_string('frontend_tmps/emails/verify_email.html',{
                        'user':user,
                        'domain': current_site,
                        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                        'token': default_token_generator.make_token(user)
                    })
                    to_mail = user.username
                    send_email = EmailMessage(mail_subject, message, to=[to_mail])
                    send_email.send()
                    #End email verification

                    return JsonResponse({'status': 1, 'message':"Registration successful."})
                else:
                    return JsonResponse({'status': 0, 'errors':form_data.errors})
            except:
              ex_details = exception_details()
              return JsonResponse({'status': 0, 'errors':ex_details}, 500)            
        else:            
            form_data = RegisterForms()            
        context = {
            'form': form_data
        }
        return render(request, 'frontend_tmps/accounts/register.html',context)
    except:
        exception_details()
        return render(request, 'errors/')
    

def activate(request, uidb64, token):
    try:
      uid = urlsafe_base64_decode(uidb64).decode()
      user = Account._default_manager.get(pk=uid)
      
    except(TypeError, ValueError, OverflowError, Account.DoesNotExist):
      user = None
    if user is not None and default_token_generator.check_token(user,token):
        user.is_active = True
        user.save()
        messages.success(request,'Congratulations! your account is activated.')
        return redirect('login')
    else:
        messages.error(request,'Invalid activation link')
        return redirect('register')
    

def login(request):
    if request.method == "POST":
       email =  request.POST['email']
       password =  request.POST['password']
       user  = auth.authenticate(email=email, password=password)
       if user is not None:
           try:
             cart = Cart.objects.get(cart_id = _cart_id(request)) 
            #  return HttpResponse(cart)            
             is_cart_item_exists = CartItem.objects.filter(cart=cart).exists()             
             if is_cart_item_exists:
                 cart_items = CartItem.objects.filter(cart=cart)                
                 for item in cart_items:
                     item.user = user
                     item.save()                  
           except:
                pass         
           auth.login(request,user)
           url =request.META.get('HTTP_REFERER')
           try:
             query = requests.utils.urlparse(url).query
             params = dict(x.split('=') for x in query.split('&'))
             if 'next' in params:
                 next_page = params['next']
                 return redirect(next_page)
           except:
                return redirect('home')
       else:
           messages.error(request, 'Invalid login credentials')
           return redirect('login')
       
    return render(request, 'frontend_tmps/accounts/login.html')

    
def forgot_password(request):
    if request.method == "POST":
        email = request.POST['email']
        if Account.objects.filter(email=email).exists():
            user = Account.objects.get(email__exact = email)
            #Reset Password
            current_site = get_current_site(request)
            mail_subject = "Reset your password"
            message = render_to_string('frontend_tmps/emails/reset_password.html',{
                'user':user,
                'domain': current_site,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': default_token_generator.make_token(user)
            })
            to_mail = user.email
            send_email = EmailMessage(mail_subject, message, to=[to_mail])
            send_email.send()
            #End Reset Password
            messages.success(request,'Password reset email has been send to your email address')
            return redirect('forgot.password')
        else:
            messages.error(request, 'Account does not exists') 
            return redirect('forgot.password')           
            
    return render(request, 'frontend_tmps/accounts/forgot_pass.html')
    
def reset_password_validate(request, uidb64, token):
    try:
      uid = urlsafe_base64_decode(uidb64).decode()
      user = Account._default_manager.get(pk=uid)      
    except(TypeError, ValueError, OverflowError, Account.DoesNotExist):
      user = None
            
    if user is not None and default_token_generator.check_token(user,token):
        request.session['uid'] = uid
        messages.success(request,'Please reset your password') 
        return redirect('reset.password')
    return render(request, 'frontend_tmps/accounts/login.html')

def reset_password(request):
    if request.method == "POST":
        # uid = None
        # user = None
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']
        if password == confirm_password:
            uid = request.session.get('uid')
            user = Account.objects.get(pk=uid)
            user.set_password(password)
            user.save()            
            messages.success(request,'Password reset successfully') 
            return redirect('login')
        else:
            messages.error(request,'Password do not match') 
            return redirect('reset.password')
    else:                
        return render(request, 'frontend_tmps/accounts/reset_password_form.html')

# If user is authenticated functions

@login_required(login_url='login')
def logout(request):
    auth.logout(request)
    messages.success(request,' You are Logged out!')
    return redirect('login')


@login_required(login_url='login')
def dashboard(request):
    orders = Order.objects.order_by('-created_at').filter(user_id=request.user.id,is_ordered=True)
    order_count = orders.count()
    billing = AddressBook.objects.filter(user=request.user,addr_type='billing')
    shipping = AddressBook.objects.filter(user=request.user,addr_type='shipping')
    try:
      user_profile = get_object_or_404(UserProfile, user=request.user)
      profile_form =  UserProfileForm(instance=user_profile) 
    except:
      user_profile = None 
      profile_form =  UserProfileForm() 
         
    user_form = UserForm(instance=request.user)
    reset_form =  ResetPasswordForms()       
    
    context={
        'orders':orders,
        'order_count':order_count,
        'user_form':user_form,
        'profile_form':profile_form,
        'user_profile':user_profile,
        'reset_form':reset_form,
        'billing':billing,
        'shipping':shipping,
    }
    return render(request, 'frontend_tmps/user_profile/account.html',context)

@login_required(login_url='login')
def my_order(request):
    orders = Order.objects.order_by('-created_at').filter(user_id=request.user.id,is_ordered=True)
    context={
        'orders':orders
    }
    return render(request, 'frontend_tmps/user_profile/my_orders.html',context)

@login_required(login_url='login')
def my_review(request):
    return render(request, 'frontend_tmps/user_profile/account.html')

@login_required(login_url='login')
def wishlist(request):
    
    return render(request, 'frontend_tmps/user_profile/wishlist.html')

def compare_product(request):
    try:            
        compare_product = CompareList.objects.filter(cart_id=_cart_id(request)).select_related('product')
        context = {
            'compare_product': compare_product,
            }
        return render(request, 'frontend_tmps/user_profile/compare.html', context)
    except CompareList.DoesNotExist:
        messages.warning(request, "You do not have compare product")
        return redirect("/")

@login_required(login_url='login')
def wishlist_product(request):
    try:            
        wishlist_product = Wishlist.objects.filter(user=request.user).select_related('product','user')
        context = {
            'wishlist_product': wishlist_product,
            }
        return render(request, 'frontend_tmps/user_profile/wishlist.html', context)
    except Wishlist.DoesNotExist:
        messages.warning(request, "You do not have wishlist product")
        return redirect("/")

@login_required(login_url='login')
def edit_profile(request):
    avatar = request.POST.get('avatar')
    
    # return HttpResponse(avatar)
    if not search('user_avatar', avatar):   
        format, img_str = avatar.split(';base64,') 
        ext = format.split('/')[-1]
        avatar_img = ContentFile(base64.b64decode(img_str), name=str(uuid.uuid4())[:12]+'.'+ext) # You can save this as file instance.    
    else:
        avatar_img = request.POST.get('avatar')
    try:
        user_profile = get_object_or_404(UserProfile, user=request.user) 
        if request.method == "POST":
            user_form = UserForm(request.POST, instance=request.user) 
            profile_form =  UserProfileForm(request.POST, instance=user_profile)       
            if user_form.is_valid() and profile_form.is_valid():
                user_form.save()
                user_profile = profile_form.save(commit=False)
                user_profile.avatar = avatar_img
                user_profile.save()                
                return JsonResponse({'status':True, 'message':'Your profile has been updated'},status=200)       
            else:
                return JsonResponse({'status':False, 'errors':profile_form.errors},status=404)            
        else:
            user_form = UserForm(instance=request.user)
            profile_form =  UserProfileForm(instance=user_profile)
      
    except:
        if request.method == "POST":            
            user_form = UserForm(request.POST, instance=request.user) 
            profile_form =  UserProfileForm(request.POST)     
                    
            if user_form.is_valid() and profile_form.is_valid():
                user_form.save()
                user_profile = profile_form.save(commit=False)
                user_profile.user = request.user
                user_profile.avatar = avatar_img
                user_profile.save()                
                return JsonResponse({'status':True, 'message':'Your profile has been updated'},status=200)       
            else:                
                return JsonResponse({'status':False, 'errors':profile_form.errors},status=404)       
        else:
            user_form = UserForm(instance=request.user)
            profile_form =  UserProfileForm(instance=user_profile)  
        
    context={
        'user_form':user_form,
        'profile_form':profile_form
    }
    return render(request, 'frontend_tmps/user_profile/account.html',context)

@login_required(login_url='login')
def change_password(request):
    if request.method=="POST":
        reset_form =  ResetPasswordForms(request.POST)       
        if reset_form.is_valid():
            current_pass = request.POST['current_password']
            new_pass = request.POST['new_password']
            # return HttpResponse(new_pass)
            confirm_pass = request.POST['confirm_password']
            user = Account.objects.get(username__iexact = request.user.username)
            if new_pass == confirm_pass:            
                success = user.check_password(current_pass)
                if success:
                    user.set_password(request.POST['new_password'])
                    user.save()
                    return JsonResponse({'status':True, 'message':'Your profile has been updated'},status=200)        
                else:
                    reset_form.add_error('current_password', "Please enter valid current password.")
                    return JsonResponse({'status':False, 'errors':reset_form.errors},status=200)       
            else:
                reset_form.add_error('confirm_password', "Confirm password does not match.")
                return JsonResponse({'status':False, 'errors':reset_form.errors},status=200)       
        else:                
            return JsonResponse({'status':False, 'errors':reset_form.errors},status=404)
    return render(request, 'frontend_tmps/user_profile/account.html')

# @login_required(login_url='login')
def address_book_edit_form(request, address_book_id, add_type):
 address_book = AddressBook.objects.get(id=address_book_id)
 if add_type == 'billing':
         form = BillingForm(instance=address_book)
 else:
         form = ShippingForm(instance=address_book)    
 context = {
        "add_type": add_type,
        'form':form
    }
 return render(request, 'frontend_tmps/user_profile/ajax/address_book.html', context)

# @login_required(login_url='login')
def get_address_book_data(request, add_type):
    if request.user.is_authenticated:
        if add_type == 'billing':
            form = BillingForm(instance=request.user)
        else:
            form = ShippingForm(instance=request.user)    
    else:
       form = ShippingForm()   
  
    
    context = {
        "add_type": add_type,
        'form':form
    }
    return render(request, 'frontend_tmps/user_profile/ajax/address_book.html', context)

# @login_required(login_url='login')
def address_book(request):
    if request.method=="POST":
        if request.POST['addr_type'] == 'billing':
          addr_book_form =  BillingForm(request.POST)    
        else:
          addr_book_form =  ShippingForm(request.POST)
           
        user_cookie = _cart_id(request)  
        if request.user.is_authenticated:
          user=request.user          
        else:
          user=None
          
        if addr_book_form.is_valid():
            addr_type = addr_book_form.cleaned_data['addr_type']
            if addr_type == 'billing':            
                if 'same_as_shipping' in request.POST and request.POST['same_as_shipping'] == 'on':
                    obj, created = AddressBook.objects.update_or_create(
                        user=user,
                        user_cookie= user_cookie,
                        addr_type=addr_type,
                        defaults={             
                            "first_name": addr_book_form.cleaned_data['first_name'],
                            "last_name": addr_book_form.cleaned_data['last_name'],
                            "contact_mobile1": addr_book_form.cleaned_data['contact_mobile1'],
                            "contact_mobile2": addr_book_form.cleaned_data['contact_mobile2'],
                            "email": addr_book_form.cleaned_data['email'],
                            "zip_code": addr_book_form.cleaned_data['zip_code'],
                            "address_line1": addr_book_form.cleaned_data['address_line1'],
                            "address_line2": addr_book_form.cleaned_data['address_line2'],
                            "country": addr_book_form.cleaned_data['country'],
                            "state": addr_book_form.cleaned_data['state'],
                            "city": addr_book_form.cleaned_data['city'],
                            "company": addr_book_form.cleaned_data['company'],
                            "pan_number": addr_book_form.cleaned_data['pan_number'],
                            "gstin": addr_book_form.cleaned_data['gstin'],
                            })
                                    
                    obj, created = AddressBook.objects.update_or_create(
                        user=user,
                        user_cookie= user_cookie,
                        shipping_title='default',
                        defaults={             
                            "first_name": addr_book_form.cleaned_data['first_name'],
                            "last_name": addr_book_form.cleaned_data['last_name'],
                            "contact_mobile1": addr_book_form.cleaned_data['contact_mobile1'],
                            "contact_mobile2": addr_book_form.cleaned_data['contact_mobile2'],
                            "email": addr_book_form.cleaned_data['email'],
                            "zip_code": addr_book_form.cleaned_data['zip_code'],
                            "address_line1": addr_book_form.cleaned_data['address_line1'],
                            "address_line2": addr_book_form.cleaned_data['address_line2'],
                            "country": addr_book_form.cleaned_data['country'],
                            "state": addr_book_form.cleaned_data['state'],
                            "city": addr_book_form.cleaned_data['city'],
                            'addr_type': 'shipping',
                            })
                else:
                    obj, created = AddressBook.objects.update_or_create(
                        user=user,
                        user_cookie= user_cookie,
                        addr_type='billing',
                        defaults={             
                            "first_name": addr_book_form.cleaned_data['first_name'],
                            "last_name": addr_book_form.cleaned_data['last_name'],
                            "contact_mobile1": addr_book_form.cleaned_data['contact_mobile1'],
                            "contact_mobile2": addr_book_form.cleaned_data['contact_mobile2'],
                            "email": addr_book_form.cleaned_data['email'],
                            "zip_code": addr_book_form.cleaned_data['zip_code'],
                            "address_line1": addr_book_form.cleaned_data['address_line1'],
                            "address_line2": addr_book_form.cleaned_data['address_line2'],
                            "country": addr_book_form.cleaned_data['country'],
                            "state": addr_book_form.cleaned_data['state'],
                            "city": addr_book_form.cleaned_data['city'],
                            "company": addr_book_form.cleaned_data['company'],
                            "pan_number": addr_book_form.cleaned_data['pan_number'],
                            "gstin": addr_book_form.cleaned_data['gstin'],
                            })
            else:        
                if 'shipping_title' in request.POST:
                    shipping_title = addr_book_form.cleaned_data['shipping_title']
                    obj, created = AddressBook.objects.update_or_create(
                        user=user,
                        user_cookie= user_cookie,
                        shipping_title=shipping_title,
                        defaults={             
                            "first_name": addr_book_form.cleaned_data['first_name'],
                            "last_name": addr_book_form.cleaned_data['last_name'],
                            "contact_mobile1": addr_book_form.cleaned_data['contact_mobile1'],
                            "contact_mobile2": addr_book_form.cleaned_data['contact_mobile2'],
                            "email": addr_book_form.cleaned_data['email'],
                            "zip_code": addr_book_form.cleaned_data['zip_code'],
                            "address_line1": addr_book_form.cleaned_data['address_line1'],
                            "address_line2": addr_book_form.cleaned_data['address_line2'],
                            "country": addr_book_form.cleaned_data['country'],
                            "state": addr_book_form.cleaned_data['state'],
                            "city": addr_book_form.cleaned_data['city'],
                            })
            return JsonResponse({'status':True, 'message':'Your profile has been updated'},status=200)        
                     
        else:                
            return JsonResponse({'status':False, 'errors':addr_book_form.errors},status=404)
    return render(request, 'frontend_tmps/user_profile/account.html')
# @login_required(login_url='login')
def address_book_list(request):
    if request.user.is_authenticated:
        billing = AddressBook.objects.filter(user=request.user,addr_type='billing')
        shipping = AddressBook.objects.filter(user=request.user,addr_type='shipping')
    else:        
        user_cookie = _cart_id(request)
        billing = AddressBook.objects.filter(user_cookie=user_cookie,addr_type='billing')
        shipping = AddressBook.objects.filter(user_cookie=user_cookie,addr_type='shipping') 
    
    context={        
        'billing':billing,
        'shipping':shipping,
    }
    return render(request, 'frontend_tmps/user_profile/ajax/address_book_list.html',context)

def address_book_list_checkout(request):
    if request.user.is_authenticated:
        shipping = AddressBook.objects.filter(user=request.user,addr_type='shipping')
    else:        
        user_cookie = _cart_id(request)
        shipping = AddressBook.objects.filter(user_cookie=user_cookie,addr_type='shipping')
        
    context={
        'shipping':shipping,
    }
    return render(request, 'frontend_tmps/user_profile/ajax/address_book_list_checkout.html',context)
@login_required(login_url='login')
def delete_address_book(request,address_book_id):
    try:
       AddressBook.objects.filter(id=address_book_id).delete()
       return JsonResponse({'status':True, 'message':'Address book deleted.'},status=200)        
    except AddressBook.DoesNotExist:
       return JsonResponse({'status':False, 'error':'Address book not exists.'},status=200)
 
@login_required(login_url='login')
def user_profile_info(request):
    try:
        user_profile = get_object_or_404(UserProfile, user=request.user)   
    except:
        pass
    context ={
        'user_profile':user_profile
    }
    return render(request, 'frontend_tmps/user_profile/ajax/user_info.html',context)
       
@login_required(login_url='login')
def order_detail(request, order_id):
    order_detail = OrderProduct.objects.filter(order__order_number=order_id)
    order = Order.objects.get(order_number = order_id)
    subtotal = 0
    for item in order_detail:
        subtotal += item.product_price * item.quantity 
     
    context = {
        'order_detail': order_detail,
        'order':order,
        'subtotal':subtotal
    }
    return render(request, 'frontend_tmps/user_profile/order_detail.html', context)

@login_required(login_url='login')
def invoice_pdf(request, order_id):
    order_detail = OrderProduct.objects.filter(order__order_number=order_id)
    order = Order.objects.get(order_number = order_id)
    
    tax= 0
    grant_total = 0
    subtotal= 0
    quantity = 0
    for item in order_detail:
            subtotal += (item.product.sale_price * item.quantity) 
            quantity += item.quantity
    tax = (3*subtotal)/100
    grant_total = subtotal+tax
     
    context = {
        'order_detail': order_detail,
        'order':order,
        'subtotal':subtotal,
        'tax':tax,
        'grant_total':grant_total,
    }
    return render(request, 'frontend_tmps/user_profile/order_detail.html', context)

def link_callback(uri, rel):
            """
            Convert HTML URIs to absolute system paths so xhtml2pdf can access those
            resources
            """
            result = finders.find(uri)
            if result:
                    if not isinstance(result, (list, tuple)):
                            result = [result]
                    result = list(os.path.realpath(path) for path in result)
                    path=result[0]
            else:
                    sUrl = settings.STATIC_URL        # Typically /static/
                    sRoot = settings.STATIC_ROOT      # Typically /home/userX/project_static/
                    mUrl = settings.MEDIA_URL         # Typically /media/
                    mRoot = settings.MEDIA_ROOT       # Typically /home/userX/project_static/media/

                    if uri.startswith(mUrl):
                            path = os.path.join(mRoot, uri.replace(mUrl, ""))
                    elif uri.startswith(sUrl):
                            path = os.path.join(sRoot, uri.replace(sUrl, ""))
                    else:
                            return uri

            # make sure that file exists
            if not os.path.isfile(path):
                    raise Exception(
                            'media URI must start with %s or %s' % (sUrl, mUrl)
                    )
            return path
 
def get_location_data(request):
    body = json.loads(request.body)
    # return HttpResponse(body['typeName'])
    if body['typeName'] == 'state':
        data = [{x.id:x.name} for x in State.objects.filter(country=body['typeId'])]      
    else:
        data = [{x.id:x.name} for x in City.objects.filter(state=body['typeId'])]
    return JsonResponse({'status':True,'data':data, 'append_to':body['typeName'],'appendEl':body['appendEl']}, status=200)

# @login_required(login_url='login')
def invoice_pdf_view(request, order_id):    
    order_detail = OrderProduct.objects.filter(order__order_number=order_id)
    order = Order.objects.filter(order_number = order_id).first()


    context =  {
            'user':"Piyush",
            'order': order,
            'order_product':order_detail,
            }

        
    template = loader.get_template("frontend_tmps/emails/order_received_email.html")
        
    return HttpResponse(template.render(context)) 
    
    tax= 0
    grant_total = 0
    subtotal= 0
    quantity = 0
    for item in order_detail:
            subtotal += (item.product.sale_price * item.quantity) 
            quantity += item.quantity
    tax = (3*subtotal)/100
    grant_total = subtotal+tax
     
    context = {
        'order_detail': order_detail,
        'order':order,
        'subtotal':subtotal,
        'tax':tax,
        'grant_total':grant_total
    }
    
    template_path = 'frontend_tmps/user_profile/invoice-pdf.html'

    template = get_template(template_path)
    html_template = template.render(context)
    # return Generate_pdf.save_invoice_pdf(request, html_template, order.order_number)
    return Generate_pdf.generate_invoice_pdf(request, html_template)
    


