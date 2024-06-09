from django.core.exceptions import ObjectDoesNotExist
from .models import Cart, CartItem
from .views import _cart_id

def counter(request):
    cart_count = 0
    if 'admin' in request.path:
        return {}
    else:
        try:
          cart = Cart.objects.filter(cart_id = _cart_id(request))          
          cart_items = CartItem.objects.all().filter(cart=cart[:1])
          for item in cart_items:
              cart_count += item.quantity
        except ObjectDoesNotExist:
            cart_count = 0
    return dict(cart_count = cart_count)

def cart_items(request, total=0, tax = 0, grant_total=0, quantity=0, cart_items =None):    
    try: 
        cart = Cart.objects.get(cart_id = _cart_id(request))        
        cart_items = CartItem.objects.filter(cart = cart, status = True)       
       
        for item in cart_items:
            total += (item.product.sale_price * item.quantity) 
            quantity += item.quantity
        tax = (3*total)/100
        grant_total = total+tax
    except ObjectDoesNotExist:
        pass
    
    # pass data to template
    context = {
        'total' : total,
        'quantity' : quantity,
        'cart_items' : cart_items,
        'tax' : tax,
        'grant_total' : grant_total,
        }
    return dict(context = context)
          
          
