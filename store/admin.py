from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Product,ReviewRating, ProductImage, ProductVariant, ProductAttribute
import admin_thumbnails
from .form import ProductAdminForm, ProductVariantAdminForm
from addons.models import Coupon

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra =1
    fields = ['image','main_thumb']
    
    
# @admin_thumbnails.thumbnail('image')    
class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra =1
    form = ProductVariantAdminForm
    
    
    
class ProductAttributeInline(admin.TabularInline):
    model = ProductAttribute
    extra =1

class ProductAdmin(admin.ModelAdmin):    
    list_display = ('product_name','sku','regular_price','sale_price','quantity', 'status','created_at')
    readonly_fields = ('created_at',)
    ordering = ('created_at',)
    prepopulated_fields = {'slug':('product_name',),'meta_title':('product_name',),'meta_description':('short_desc',)}
    inlines = [ProductImageInline,ProductVariantInline,ProductAttributeInline]
    
    form = ProductAdminForm
    
    class Media:
        js = (
            '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', # jquery
            'admin/admin.js',       # project static folder
        )
   
    

# Register your models here.
admin.site.register(Product, ProductAdmin)
admin.site.register(ReviewRating)
admin.site.register(ProductImage)
