from django.urls import path
from accounts import views

urlpatterns = [
    # Before login account urls 
    path('register', views.register, name="register"),  
    path('activate/<uidb64>/<token>/', views.activate, name='activate'),  
    path('login', views.login, name="login"),
    path('logout', views.logout, name="logout"),
    path('forgot-password', views.forgot_password, name="forgot.password"),
    path('reset-password-validate/<uidb64>/<token>/', views.reset_password_validate, name="reset.password.validate"),
    path('reset-password', views.reset_password, name="reset.password"),
    
    # After login account urls 
    path('dashboard', views.dashboard, name="dashboard"),
    path('my-orders', views.my_order, name="my_order"),
    path('my-reviews', views.my_review, name="my_review"),
    
    path('my-compare', views.compare_product, name="compare.product"),
    path('my-wishlist', views.wishlist_product, name="wishlist.product"),
    
    path('edit-profile', views.edit_profile, name="edit.profile"),
    path('user-profile-info', views.user_profile_info, name="user.profile.info"),
    path('change-password', views.change_password, name="change.password"),
    path('order-datail/<str:order_id>', views.order_detail, name="order.detail"),
    # path('invoice-pdf/<int:order_id>', views.invoice_pdf, name="invoice.pdf"),
    path('invoice-pdf-view/<str:order_id>', views.invoice_pdf_view, name="invoice.pdf.view"),
    
    path('get-location-data', views.get_location_data, name="get.location.data"),
    path('get-address-book-form/<slug:add_type>', views.get_address_book_data, name="get.address.book.form"),
    path('address-book', views.address_book, name="address.book"),
    path('address-book-list', views.address_book_list, name="address.book.list"),
    path('address-book-list-checkout', views.address_book_list_checkout, name="address.book.list.checkout"),
    path('delete-address-book/<int:address_book_id>', views.delete_address_book, name="delete.address.book"),
    path('address-book-edit-form/<int:address_book_id>/<slug:add_type>', views.address_book_edit_form, name="address.book.edit.form"),
    
    
    
    
]