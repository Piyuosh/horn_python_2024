from django.shortcuts import render, get_object_or_404, redirect
from django.template.loader import render_to_string, get_template
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Q, Avg, Max, Min, Sum
from django.http import HttpResponse
from django.core.paginator import EmptyPage,PageNotAnInteger, Paginator
from .models import Product, ReviewRating, ProductImage, ProductVariant
from frontend.models import Category 
from .form import ReviewForm
from cart.views import _cart_id
from cart.models import CartItem
from orders.models import OrderProduct
from django.http.response import JsonResponse
import datetime, json
from .filters import ProductFilter


# Create your views here.
def cat_product(request, category_slug=None):
    categories = None 
    paged_products = None
    
    if category_slug != None:
        categories = get_object_or_404(Category, slug=category_slug)      
        products = Product.objects.all().filter(category = categories, status = True).order_by('id')
    else: 
        products = Product.objects.all().filter(status = True).order_by('id')
    
    
    # max_price = products.aggregate(Max('sale_price'))
    # min_price = products.aggregate(Min('sale_price'))
    categories_list = Category.objects.filter(id=categories.id)
    
    # color = ProductVariant.objects.filter(Q(product__in= products.values_list('id', flat=True)) & Q(variation=2))
    # size = ProductVariant.objects.filter(Q(product__in= products.values_list('id', flat=True)) & Q(variation=1))
    
    
    paginator = Paginator(products,10)
    page =   request.GET.get('page')
    paged_products = paginator.get_page(page)
                  
    total = products.count()   
    # filter = ProductFilter(request.GET, queryset=Product.objects.all())
    context = {
        'products' : paged_products,
        'total_product': total,
        'categories_list':categories_list,        
        # 'max_price':max_price.get('sale_price__max'),
        # 'min_price':min_price.get('sale_price__min'),
        # 'variations':variations,
        'category_slug':category_slug,          
    }
    return render(request, 'frontend_tmps/category_product.html', context)

def cat_filter_product(request): 
    item_par_page = request.POST.get('item_par_page') 
    # return HttpResponse(request.POST) 
    filter = ProductFilter(request.POST, queryset=Product.objects.all())
    
    return HttpResponse(filter.qs)        
    # if sorting:
    #     if sorting == 'desc':
    #       products.
    #     elif sorting == 'price_asc':
    #       pass
    #     elif sorting == 'price_desc':
    #       pass
    #     elif sorting == 'rating_desc':
    #       pass
    #     else:
    #       pass
     
    
    paginator = Paginator(products,item_par_page)
    page =   request.GET.get('page')
    paged_products = paginator.get_page(page)
                  
    total = products.count()   
    
    context = {
        'products' : paged_products,
        'total_product': total,
    }
    return render(request, 'frontend_tmps/ajax-content/ajax_product.html', context)

 
def percentage(percent, whole):
  return int((percent * int(whole)) / 100)

def product_view(request, product_slug):
    try:
        product = Product.objects.get(slug = product_slug)
        in_cart = CartItem.objects.filter(cart__cart_id = _cart_id(request), product = product).exists()
        # return HttpResponse(in_cart)
        # exit()
        per_num = percentage(10,product.sale_price)
        min_price = product.sale_price-per_num
        max_price = product.sale_price+per_num
        # return HttpResponse(product.sale_price)
        related_product = Product.objects.filter(category=product.category, sale_price__range=(min_price,max_price))
        if request.user.is_authenticated:
            try:
                ordered_product = OrderProduct.objects.filter(user=request.user,product_id=product.id).exists()
            except OrderProduct.DoesNoteExist:
                ordered_product =None
        else:
             ordered_product =None
        # get Product reviews and ratings
        reviews = ReviewRating.objects.filter(product_id=product.id, status=True)
        # get Product images
        product_images = ProductImage.objects.filter(product=product.id)
        context = {
            'product': product,
            'in_cart':in_cart,
            'ordered_product':ordered_product,
            'reviews':reviews,
            'product_images': product_images,
            'related_product':related_product,
        }
    except Exception as e:
      raise e    
    return render(request, 'frontend_tmps/product_view.html', context)



# header search
def header_search(request):
    if 'keyword' in request.GET:
        keyword = request.GET['keyword']
        products= None
        if keyword:
            products = Product.objects.order_by('id').filter(Q(product_name__icontains=keyword) | Q(meta_keyword__icontains=keyword))
            paginator = Paginator(products,10)
            page =   request.GET.get('page')
            paged_products = paginator.get_page(page)
            product_count = products.count()
                
    total = products.count()
    context = {
        'products' : paged_products,
        'total_product': total,
    }    
    return render(request, 'frontend_tmps/search_result.html', context)

def review_rating(request, product_id):
    url = request.META.get("HTTP_REFERER")
    if request.method == 'POST':
        try:
          review_rating = ReviewRating.objects.get(user__id=request.user.id,product__id=product_id)
          form = ReviewForm(request.POST, instance = review_rating)
          form.save()
          messages.success(request,'Thanks you! Your review has been updated')
          return redirect(url)
        except ReviewRating.DoesNotExist:
          form = ReviewForm(request.POST)
          if form.is_valid():
              data = ReviewRating()
              data.subject = form.cleaned_data['subject']
              data.rating = form.cleaned_data['rating']
              data.review = form.cleaned_data['review']
              data.ip = request.META.get('REMOTE_ADDR')
              data.product_id = product_id
              data.user_id = request.user.id
              data.save()
              messages.success(request,'Thanks you! Your review has been submitted')
              return redirect(url)
              
    
