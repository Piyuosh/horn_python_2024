from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import JsonResponse
from asgiref.sync import async_to_sync
import os
import datetime, json
import channels.layers

from store.models import Product
from addons.models import Banner
from .forms import ContactUsForm


# Index Function

def index(request):
    # start_path = '.' # current directory
    # for path,dirs,files in os.walk(start_path):
    #     for filename in files:
    #         print(os.path.join(path,filename))
 
    products = Product.objects.filter(status=True)
    home_banner = Banner.objects.filter(position=1)[:4]
    
    context = {
        'products' : products,
        'home_banner':home_banner,
        'room_name': "broadcast",
    }
    response = render(request,"frontend_tmps/index.html", context)
    # cart = request.COOKIES.get('cart_key')     
    # if not cart:
    #     # return HttpResponse(cart)  
    #     request.session.create()         
    #     cart = request.session.session_key
    #     response.set_cookie('cart_key', cart) 
    return response
    # return HttpResponse('Home page from frontend')
    
def about_us(request):
    return render(request,"frontend_tmps/about_us.html")

def contact_us(request):
    if request.method == 'POST':
        form = ContactUsForm(request.POST)          
        if form.is_valid():
            form.save()
            return JsonResponse({'status':True, 'message':'Your message was sent successfully. Thanks.'}, status=404)
        else:
            return JsonResponse({'status':False, 'errors':form.errors}, status=404)        
    else:
        form = ContactUsForm()          
    return render(request, "frontend_tmps/contact_us.html", {'form':form})

def privacy_policy(request):
    return render(request,"frontend_tmps/privacy_policy.html")

def quick_view(request):
    body = json.loads(request.body)
    product = Product.objects.get(uuid=body['pro_uuid'])
    context = {
        'product':product
    }
    return render(request, "frontend_tmps/ajax-content/quick-view.html", context)        
    

def test_notification(request):
    channel_layer = channels.layers.get_channel_layer()
    async_to_sync(channel_layer.send)(
            'notification_broadcast',
            {
                'type': 'send_notification',
                'message': 'notification'
            }
        )
    return HttpResponse("Done")