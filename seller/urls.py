from django.urls import path
from seller import views

urlpatterns = [
    
    # Before login account urls 
    path('register/', views.register, name="register"),  
    path('activate/<uidb64>/<token>/', views.activate, name='activate'),  
    path('login/', views.login, name="login"),
    path('logout/', views.logout, name="logout"),
    path('forgot-password/', views.forgot_password, name="forgot.password"),
    path('reset-password-validate/<uidb64>/<token>/', views.reset_password_validate, name="reset.password.validate"),
    path('reset-password', views.reset_password, name="reset.password"),
    
    # After login account urls
    path('', views.dashboard, name="dashboard"), 
    path('dashboard', views.dashboard, name="dashboard"),
    
    #seller profile
    path('profile', views.profile, name="profile"),
    path('edit-profile', views.edit_profile, name="edit.profile"),
    path('change-password', views.change_password, name="change.password"),
    
    #product inventry
    path('categories', views.CategoryCreateView.as_view(), name='category.list'),
    path('products', views.ProductListView.as_view(), name='product.list'),
    # path('product/create/(?P<cat_uuid>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$', views.ProductCreateView.as_view(), name='product.create'),
    # path('product/<int:pk>', views.ProductDetailView.as_view(), name='product.detail'),
    # path('product/<int:pk>/update', views.ProductUpdateView.as_view(), name='product.update'),
    # path('product/<int:pk>/delete', views.ProductDeleteView.as_view(), name='product.delete'),
    path('products/create/<uuid:cat_id>/', views.product_create, name='product.create'),    
    path('products/edit/<uuid:pro_uuid>/', views.product_edit, name='product.edit'),    
    path('theme-attributes/<int:attr_id>', views.theme_attribute, name='theme.attribute'),

    path('get/variation/theme/attributes/', views.get_variation_theme_attribute, name='get.variation.theme.attributes'),
    path('get/variation/theme/attributes/add/more/', views.get_variation_theme_attr_add_more, name="get.variation.theme.attr.add.more"),
    path('add-more-theme-attr/<int:attr_id>', views.add_more_theme_attr, name='add.more.theme.attr'),
    path('products/attr/create/', views.product_attr_create, name='product.attr.create'),
    path('products/images/create', views.product_images_create, name='product.images.create'),
    path('products/other/details', views.product_other_details, name='product.other.details'),
    
    
    
    
   
]