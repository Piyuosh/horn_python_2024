from django.urls import path
from orders import views

urlpatterns = [
    # pages urls
    path('place-order/', views.place_order, name="place.order"), 
    path('payment/', views.payment, name="payment"), 
    path('complete/<str:order_number>/', views.order_complete, name="order.complete"),
    # path('complete/cod/', views.order_complete_cod, name="order.complete.cod"), 
    # path('order/placed/test/', views.order_placed, name="order.placed"), 
    path('razorpay/callback_url/',views.razorpay_callback, name="callback_url") 
    
     
    # end pages urls
]