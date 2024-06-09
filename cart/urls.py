from django.urls import path
from . import views


urlpatterns = [
    path("", views.cart, name="cart.product"),
    path("cart-item-list", views.cart_item_list, name="cart.item.list"),
    path("cart-item-page", views.cart_item_page, name="cart.item.page"),
    path('add-cart/<int:product_id>', views.add_to_cart, name="add.to.cart"),
    path('add-to-compare', views.add_to_compare, name="add.to.compare"),
    path('add-to-wishlist', views.add_to_wishlist, name="add.to.wishlist"),
    
    path('remove-compare-product', views.remove_compare_product, name="remove.compare.product"),
    path('remove-wishlist-product', views.remove_wishlist_product, name="remove.wishlist.product"),   
    
    path('add_cart_view', views.add_to_cart_view, name="add.to.cart.view"),
    path('decrease_quantity/<int:product_id>', views.decrease_quantity, name="decrease.quantity"),
    path('remove_cart_item/<int:product_id>', views.remove_cart_item, name="remove.cart.item"),
    path('checkout/',views.checkout, name="checkout"),
    path('payment/success', views.payment_success, name="payment_success"),
    path('payment/failure', views.payment_failure, name="payment_failure"),
    path('payment/cancel', views.payment_cancel, name="payment_cancel"),
    
    path('checkout-ajax',views.checkout_ajax, name="checkout.ajax"),
    path('shipping-estimate',views.shipping_estimate, name="shipping.estimate"),

    path('apply/coupon/code/',views.apply_coupon_code, name="apply.coupon.code"),

    path('ajax/order/summary/',views.order_summary, name="order.summary"),

    
    
]
