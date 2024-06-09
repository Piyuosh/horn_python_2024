"""hornbill URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include,re_path
from django.conf.urls.static import static
from django.conf import settings
from store import views as store_views
from frontend import views as front_view 


admin.site.site_header = 'Hornbill Mart Administration'                    # default: "Django Administration"
admin.site.index_title = 'Hornbill Mart administration'     # default: "Site administration"
admin.site.site_title = 'Hornbill Mart site admin' # default: "Django site admin"

urlpatterns = [ 
    path('admin/',include('admin_honeypot.urls', namespace="admin_honeypot")),
    re_path(r'^superadmin/', admin.site.urls),
    # re_path(r'^super-admin/',include('super_admin.urls')),
    re_path(r'^seller/',include(('seller.urls', 'seller'), namespace='seller')),
    
    path('',include('frontend.urls')),
    re_path(r'^category/',include('store.urls')),
    re_path(r'^cart/',include('cart.urls')),    
    re_path(r'^account/',include('accounts.urls')),
    re_path(r'^search/',store_views.header_search, name="search"),
    re_path(r'^order/', include('orders.urls'), name="order"),
    re_path(r'^variation/', include('variation.urls'), name="variation"),
    
    re_path(r'^about-us', front_view.about_us, name="about.us"),    
    re_path(r'^contact-us', front_view.contact_us, name="contact.us"),
    re_path(r'^privacy-policy', front_view.privacy_policy, name="privacy.policy"),
    re_path(r'^quick-view', front_view.quick_view, name="quick.view"), 
    
    path('<slug:product_slug>', store_views.product_view, name="product_view"),
    
    
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

# static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
