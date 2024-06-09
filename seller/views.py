import base64,uuid
from django.core.files.base import ContentFile
from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Q
from django.http import HttpResponse
from django.http.response import JsonResponse
from django.contrib import messages,auth
from django.template.defaultfilters import slugify
from django import template
import random, string


from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
# specific to this view
from django.views.generic import ListView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views.generic.detail import DetailView

from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.urls import reverse_lazy

from store.models import Product,ProductImage, ProductAttribute, ProductVariant, ProductVariantValue
from frontend.models import Category
from .forms import RegisterForms, UserForm, UserProfileForm, LoginForms, ForgotForms, ResetPasswordForms
from accounts.models import Account, UserProfile
import requests, json
from seller.forms import ProductForm, VariationThemeForm
from variation.models import AttributeName, VariationTheme, AttributeValue


from py_avataaars import PyAvataaar

import os
from django.conf import settings
from django.template.loader import get_template
from django.contrib.staticfiles import finders

#for email verification
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage
from common import base64_img

# Create your views here.
#ragister

def register(request): 
    form_data = None     
    if request.method == "POST":
        post_data = json.loads(request.body.decode('utf-8'))        
        form_data = RegisterForms(post_data)
       
        if form_data.is_valid():            
            first_name = form_data.cleaned_data['first_name']
            last_name = form_data.cleaned_data['last_name']
            email = form_data.cleaned_data['email']
            password = form_data.cleaned_data['password']
            mobile_no = form_data.cleaned_data['mobile_no']
            
            user = Account.objects.create_vendor_user(first_name,last_name,email,mobile_no,password)
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
            to_mail = user.email
            send_email = EmailMessage(mail_subject, message, to=[to_mail])
            send_email.send()
            #End email verification
            return JsonResponse({'status':True},status=200)
        else:
            return JsonResponse({'status':False, 'errors':form_data.errors},status=404)
                     
    else:        
        form_data = RegisterForms()        
    context = {
        'form': form_data
    }
    return render(request, 'seller_tmps/register.html',context)

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
    form_data=None
    if request.method == "POST":
       
        post_data = json.loads(request.body.decode('utf-8'))   
        print("haere----", post_data)     
        form_data = LoginForms(post_data)               
        if form_data.is_valid(): 
           email = form_data.cleaned_data['email']
           password = form_data.cleaned_data['password']
           user  = auth.authenticate(email=email, password=password, is_active=True)
           print("user", user)
           if user is not None:                
                auth.login(request,user)
                url =request.META.get('HTTP_REFERER')          
                return JsonResponse({'status':True},status=200)
        else:
            return JsonResponse({'status':False, 'errors':form_data.errors},status=404)
    else:
        form_data = LoginForms()
    context = {
        'form': form_data
    }       
    return render(request, 'seller_tmps/login.html', context)

    
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
            return JsonResponse({'status':True,'message':"Password reset email has been send to your email address"},status=200)            
        else:
            return JsonResponse({'status':False, 'errors':'Account does not exists'},status=404)
            
    context = {
        'form':ForgotForms()
    }        
    return render(request, 'seller_tmps/forgot_password.html',context)
    
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
        form_fields = ResetPasswordForms()
        context = {
            'form': form_fields
        }               
        return render(request, 'seller_tmps/reset_password_form.html', context)

# If user is authenticated functions

@login_required(login_url='seller:login')
def logout(request):
    auth.logout(request)
    messages.success(request,' You are Logged out!')
    return redirect('login')



@login_required(login_url='seller:login')
def edit_profile(request):    
    try:
        user_profile = get_object_or_404(UserProfile, user=request.user)      
        if request.method == "POST":
            user_form = UserForm(request.POST, instance=request.user) 
            profile_form =  UserProfileForm(request.POST, request.FILES, instance=user_profile)       
            if user_form.is_valid() and profile_form.is_valid():
                user_form.save()
                profile_form.save()
                messages.success(request, 'Your profile has been updated')
                return redirect('dashboard')
            else:
                return HttpResponse(profile_form.errors.as_json())        
        else:
            user_form = UserForm(instance=request.user)
            profile_form =  UserProfileForm(instance=user_profile)
      
    except:
        if request.method == "POST":
            user_form = UserForm(request.POST, instance=request.user) 
            profile_form =  UserProfileForm(request.POST, request.FILES)       
            if user_form.is_valid() and profile_form.is_valid():
                user_form.save()
                user_profile = profile_form.save(commit=False)
                user_profile.user = request.user
                user_profile.save()
                messages.success(request, 'Your profile has been updated')
                return redirect('dashboard')
            else:
                return HttpResponse(profile_form.errors.as_json())        
        else:
            user_form = UserForm(instance=request.user)
            profile_form =  UserProfileForm(instance=user_profile)   
    
        
    context={
        'user_form':user_form,
        'profile_form':profile_form
    }
    return render(request, 'frontend_tmps/user_profile/account.html',context)

@login_required(login_url='seller:login')
def change_password(request):
    if request.method=="POST":
        current_pass = request.POST['password']
        new_pass = request.POST['new_password']
        confirm_pass = request.POST['c_pass']
        user = Account.objects.get(username__iexact = request.user.username)
        if new_pass == confirm_pass:
            success = user.check_password(current_pass)
            if success:
                user.set_password(new_pass)
                user.save()
                # auth.logout()
                messages.success(request,'Password updated successfully.')
                return redirect('dashboard')
            else:
               messages.error(request,'Please enter valid current password.')
               return redirect('dashboard')     
        else:
            messages.error(request,'Confirm password does not match.')
            return redirect('dashboard')
    return render(request, 'frontend_tmps/user_profile/account.html')
@login_required(login_url='seller:login')
def dashboard(request):
    # avatar = PyAvataaar()
    # avatar.render_png_file('deafult2.png')
    return render(request, 'seller_tmps/index.html')

@login_required(login_url='seller:login')
def profile(request):
    return render(request, 'seller_tmps/seller_profile/profile.html')

#product catalog
@method_decorator(login_required, name="dispatch")
class ProductListView(ListView):
    model = Product
    template_name = "seller_tmps/product/list.html"
    context__object_name = "products"
    paginate_by = 10
    
    def get_context_data(self, **kwargs):
         context = super(ProductListView, self).get_context_data(**kwargs)
         products = self.get_queryset()
         page = self.request.GET.get('page')
         paginator = Paginator(products, self.paginate_by)
         try:
           products = paginator.page(page)
         except PageNotAnInteger:
           products = paginator.page(1)
         except:
           products = paginator.page(paginator.num_pages)
         
         context["products"] = products
         return context

@method_decorator(login_required, name='dispatch')
class CategoryCreateView(CreateView):
    model = Category
    template_name = 'seller_tmps/product/cat_list.html'
    fields = "__all__"
    success_url = reverse_lazy('category.list')

register_img = template.Library()
@register_img.filter()
def img_range(min=5):
    return range(min)

@login_required(login_url='seller:login')
def product_create(request, cat_id):
    if request.method == 'POST':
        product_form = ProductForm(request.POST)
        try:
            category = Category.objects.get(uuid = cat_id)            
        except Category.DoesNotExist:
            product_form.add_error('common_errors', "Selected category not exists.")
            return JsonResponse({'status':False, 'errors':product_form.errors}, status=200)
        
        if product_form.is_valid():            
            obj = Product() #gets new object
            obj.product_name        = product_form.cleaned_data['product_name']
            obj.slug                = slugify(product_form.cleaned_data['product_name'])
            obj.short_desc          = product_form.cleaned_data['short_desc']
            obj.long_desc           = product_form.cleaned_data['long_desc']
            obj.meta_title          = product_form.cleaned_data['meta_title']
            obj.meta_description    = product_form.cleaned_data['meta_description']
            obj.meta_keyword        = product_form.cleaned_data['meta_keyword']
            obj.quantity            = product_form.cleaned_data['quantity']
            obj.regular_price       = product_form.cleaned_data['regular_price']
            obj.sale_price          = product_form.cleaned_data['sale_price']
            obj.category            = category
            obj.user                = request.user
            #finally save the object in db
            obj.save()
            # return HttpResponse(obj.uuid)
            return JsonResponse({'status':True, 'message':"Product edded successfully.", 'product_uuid':obj.uuid, 'cat_uuid':cat_id}, status=200)
        else:
            return JsonResponse({'status':False, 'errors':product_form.errors}, status=200)
    else:
        form = ProductForm()
        variation_theme_form= VariationThemeForm()
    context = {
        'form': form,
        'cat_id':cat_id,
        'img_range':img_range(8),
        'variation_theme_form' : variation_theme_form,
    }
    return render(request, 'seller_tmps/product/create.html', context)

def product_edit(request, pro_uuid):
    return HttpResponse(pro_uuid)
    form = ProductForm()
    variation_theme_form= VariationThemeForm()
    context = {
        'form': form,
        'cat_id':cat_id,
        'img_range':img_range(8),
        'variation_theme_form' : variation_theme_form,
    }
    return render(request, 'seller_tmps/product/create.html', context)

def random_sku():
     return 'HM'+''.join(random.choices(string.ascii_uppercase+string.digits,k=8))
 
def product_attr_create(request):
    if request.method == 'POST':         
        try:
          product = Product.objects.get(uuid=request.POST['product_uuid'])
        except Product.DoesNotExist:
          product = None
          
        try:
            title = request.POST.getlist('title[]')
            total = len(title)
            sku = request.POST.getlist('sku[]')
            price = request.POST.getlist('price[]')
            qty = request.POST.getlist('qty[]')
            attr_id = request.POST.getlist('attr_name[]')
            attr_total = len(set(attr_id))
            # return HttpResponse(attr_total)
            for i in range(attr_total):
                attr_name = AttributeName.objects.get(id=attr_id[i])
                
                variant   =  ProductVariant()
                variant.variation   = attr_name
                variant.product     = product            
                variant.save()
                
                total_value = len(request.POST.getlist(attr_name.slug+'[]'))
                for j in range(total_value):               
                    attr_value = request.POST.getlist(attr_name.slug+'[]')
                    
                    variant_value = ProductVariantValue()
                    variant_value.productvariant    = ProductVariant.objects.get(id=variant.id)
                    variant_value.product           = product
                    variant_value.title             = title[j]
                    variant_value.sku               = random_sku() 
                    variant_value.quantity          = qty[j]
                    variant_value.price             = price[j]
                    
                    if attr_name.input_type == 'dropdown':
                        variant_value.attributevalue   = AttributeValue.objects.get(id=attr_value[j])                                       
                    else:
                        variant_value.content_type = attr_value[j]     
                    variant_value.save()
            return JsonResponse({'status':True, 'message':'Product variation added successfully'},status=200)   
        except Exception as e:
          return JsonResponse({'status':False,'errors':e},status=200)
                     
        
    
def product_images_create(request):
    if request.method == 'POST':         
        try:
            product = Product.objects.get(uuid=request.POST['product_uuid'])          
            product_images = request.POST.getlist('product_images[]')
            total_img = len(product_images)
            
            for i in range(total_img):
                                
                format, img_str = product_images[i].split(';base64,') 
                ext = format.split('/')[-1]
                pro_image = ContentFile(base64.b64decode(img_str), name=str(uuid.uuid4())[:12]+'.'+ext) # You can save this as file instance.    
                
                product_img = ProductImage()
                product_img.image = pro_image
                product_img.product = product
                if i == 0:
                    product_img.main_thumb = 1            
                product_img.save()
                                
            return JsonResponse({'status':True, 'message':'Product images edded successfully'})
        except Product.DoesNotExist:
            return JsonResponse({'status':True, 'error':'Product does not exists.'})
        
            
def product_other_details(request):
    if request.method == 'POST':         
        try:
            product = Product.objects.get(uuid=request.POST['product_uuid'])          
            label_list   = request.POST.getlist('label[]')  
            value_list   = request.POST.getlist('value[]')            
            other_detail = dict(zip(label_list, value_list))
            # return HttpResponse(other_detail.items())
            
            product_detail  = ProductAttribute()
            product_detail.options = other_detail
            product_detail.product = product                    
            product_detail.save()                                
            return JsonResponse({'status':True, 'message':'Product other details edded successfully'})
        except Product.DoesNotExist:
            return JsonResponse({'status':True, 'error':'Product does not exists.'})
        
def theme_attribute(request, attr_id):
    body = json.loads(request.body.decode('utf-8'))
    product_uuid = body['product_uuid']
    try:
      product = Product.objects.get(uuid=product_uuid)
    except Product.DoesNotExist:
      product = None
    theme_attributes = VariationTheme.objects.get(id=attr_id)
   
    # return HttpResponse(theme_attributes.pro_attr.values())  
    context = {
        'theme_attributes':theme_attributes,
        'product': product,
        'variation_theme':attr_id,
    }
    return render(request, 'seller_tmps/product/ajax/variation_attr.html', context)

def get_variation_theme_attribute(request):
    body = json.loads(request.body.decode('utf-8'))
    theme_id = body['theme_id']
    row_id = body['row_id']
    product_uuid = body['product_uuid']

    try:
      product = Product.objects.get(uuid=product_uuid)
    except Product.DoesNotExist:
      product = None

    theme_attributes = VariationTheme.objects.get(id=theme_id)
    # return HttpResponse(theme_attributes.pro_attr.values())
    context = {
        'theme_attributes':theme_attributes,
        'row_id': row_id,
        'img_range':range(4),
        'product':product
    }
    return render(request, 'seller_tmps/product/ajax/multi_variation.html', context)

def get_variation_theme_attr_add_more(request):
    body = json.loads(request.body.decode('utf-8'))
    theme_id = body['theme_id']
    last_row_no = body['last_row_no']
    product_uuid = body['product_uuid']
    
    try:
      product = Product.objects.get(uuid=product_uuid)
    except Product.DoesNotExist:
      product = None

    theme_attributes = VariationTheme.objects.get(id=theme_id)
    # return HttpResponse(theme_attributes.pro_attr.values())
    context = {
        'theme_attributes':theme_attributes,
        'last_row_no': last_row_no,
        'img_range':range(4),
        'product':product
    }
    return render(request, 'seller_tmps/product/ajax/variation_attr_add_more_model.html', context)

def add_more_theme_attr(request, attr_id):
    body = json.loads(request.body.decode('utf-8'))
    product_uuid = body['product_uuid']
    try:
      product = Product.objects.get(uuid=product_uuid)
    except Product.DoesNotExist:
      product = None
    theme_attributes = VariationTheme.objects.get(id=attr_id)
    context = {
        'theme_attributes':theme_attributes,
        'product': product,
        'last_row_no':int(body['last_row_no'])+1,
    }
    return render(request, 'seller_tmps/product/ajax/variation_attr_add_more.html', context)

# @method_decorator(login_required, name='dispatch')
# class ProductCreateView(CreateView):
#     model = Product
#     template_name = 'seller_tmps/product/create.html'
#     form_class = ProductForm
#     success_url = reverse_lazy('product.list')

# @method_decorator(login_required, name='dispatch')
# class ProductDetailView(DetailView):

#     model = Product
#     template_name = 'seller_tmps/product/detail.html'
#     context_object_name = 'product'

# @method_decorator(login_required, name='dispatch')
# class ProductUpdateView(UpdateView):

#     model = Product
#     template_name = 'seller_tmps/product/update.html'
#     context_object_name = 'product'
#     fields = ('product_name', 'short_desc', )

#     def get_success_url(self):
#         return reverse_lazy('product-detail', kwargs={'pk': self.object.id})


# @method_decorator(login_required, name='dispatch')
# class ProductDeleteView(DeleteView):
#     model = Product
#     template_name = 'seller_tmps/product/delete.html'
#     success_url = reverse_lazy('product.list')
     
