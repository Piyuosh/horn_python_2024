from email.policy import default
import sys
from django.db import models
from django.urls import reverse
from django.db.models import Avg, Count
from frontend.models import Category
from accounts.models import Account
from variation.models import AttributeName, AttributeValue, DescriptionType
from uuid import uuid4
import random, string
from PIL import Image
from io import BytesIO
from constant.models import IMAGE_TYPE


def random_sku():
     return 'HM'+''.join(random.choices(string.ascii_uppercase+string.digits,k=8))

def pro_img_path():
     return 'pro_img/%Y/%m/%d/'

def variation_img_path():
     return 'variation_img/%Y/%m/%d/'

def generateUUID():
    return str(uuid4())

# Create product images models here.
    

# Create product models here.
class Product(models.Model):  
      uuid                 = models.UUIDField(default=generateUUID, max_length=36, unique=True, editable=False)  
      user                 = models.ForeignKey(Account, verbose_name=("Created By"), on_delete=models.CASCADE,null = True, blank = True)
      product_name         = models.CharField(max_length=200, unique=True)
      slug                 = models.SlugField(max_length=200, unique=True)
      sku                  = models.CharField(default=random_sku, max_length=36, unique=True, editable=False) 
      
      category             = models.ForeignKey(Category, verbose_name=("Category"), related_name="category", on_delete=models.CASCADE, null = True, blank = True)
     
      short_desc           = models.TextField(null = True, blank = True)
      long_desc            = models.TextField(null = True, blank = True)
      meta_title           = models.CharField(max_length=200, null = True, blank = True)
      meta_description     = models.TextField(null = True, blank = True)
      meta_keyword         = models.TextField(null = True, blank = True) 
      quantity             = models.IntegerField(null = True, blank = True)  
      regular_price        = models.DecimalField(
                              max_digits = 10,
                              decimal_places = 2, null = True, blank = True)
      sale_price           = models.DecimalField(
                              max_digits = 10,
                              decimal_places = 2)  
      rating_cache         = models.FloatField(default=0.0)
      rating_count         = models.IntegerField(default=0) 
      shipping_cost        = models.DecimalField(
                              max_digits = 10,
                              decimal_places = 2, null = True, blank = True)      
      viewed               = models.BigIntegerField(default=0)
      stock                = models.BooleanField(default=1)
      units_sold           = models.BigIntegerField(default=0)
      status               = models.IntegerField(default = 1,
                                          blank = True,
                                          null = True,
                                          help_text ='1->Active, 0->Inactive', 
                                          choices =(
                                          (1, 'Active'), (0, 'Inactive')
                                          ))
      created_at           = models.DateField(auto_now_add=True,editable=False,null = True,blank=True)
      updated_at           = models.DateField(auto_now=True,editable=False,null = True,blank=True)
      
      class Meta:
            db_table = "products"
            # Add verbose name
            verbose_name = 'Product List'
            # verbose_name_plural = 'categories'

      def __str__(self):
            return self.product_name
      
      def averageReview(self):
            reviews = ReviewRating.objects.filter(product=self, status=True).aggregate(average=Avg('rating'))
            avg = 0
            if reviews['average'] is not None:
              avg = float(reviews['average'])
            return avg

      def countReview(self):
            reviews = ReviewRating.objects.filter(product=self, status=True).aggregate(count=Count('id'))
            count = 0
            if reviews['count'] is not None:
              count = int(reviews['count'])
            return count
      
      def persent_off(self):
            percentage = 100 * float(self.sale_price)/float(self.regular_price)
            return int(100-percentage)
      
      @property
      def mainThumb(self):
            mainthumb = ProductImage.objects.filter(product=self, main_thumb=1)
            if not mainthumb:
                  mainthumb = ProductImage.objects.filter(product=self)                  
                  if mainthumb:
                        return mainthumb.image.url
                  else:
                       return None


      def get_absolute_url(self):
            return reverse('product_view', args=[self.slug])

class ReviewRating(models.Model):
     product     = models.ForeignKey(Product, on_delete=models.CASCADE)
     user        = models.ForeignKey(Account, on_delete=models.CASCADE)
     subject     = models.CharField(max_length=50, blank=True)
     review      = models.TextField(blank=True)
     rating      = models.FloatField()
     ip          = models.CharField(max_length=50)
     status      = models.BooleanField(default=True)
     created_at  = models.DateTimeField(auto_now=False, auto_now_add=True)
     updated_at  = models.DateTimeField(auto_now=True, auto_now_add=False)     
 
     class Meta:
         db_table = 'reviews'
         verbose_name = ("Review")
         verbose_name_plural = ("Reviews")
 
     def __str__(self):
         return self.subject
      
    
class ProductVariant(models.Model):
    variation        = models.ForeignKey(AttributeName,on_delete=models.CASCADE,blank=True,null=True) 
    product          = models.ForeignKey(Product, on_delete=models.CASCADE)
  
    class Meta:
            db_table = 'product_variant'
            verbose_name = ("Product Variant")
            verbose_name_plural = ("Product Variants") 
            
    def __str__(self):
        return self.product.product_name
  
    def product_title(self):
          product = Product.objects.get(id=self.product)
          if product is not None:
                variation_name = product.product_name
          else:
                variation_name = ''
          return variation_name
          

class ProductVariantValue(models.Model):
    productvariant   = models.ForeignKey(ProductVariant, related_name=("relProductVariantValueProductVariant"), on_delete=models.CASCADE, blank=True,null=True) 
    product          = models.ForeignKey(Product, related_name=("relProductVariantValueProduct"), on_delete=models.CASCADE)     
    
    title            = models.CharField(max_length=100, blank=True,null=True)
    sku              = models.CharField(max_length=36, unique=True, editable=False, blank=True,null=True)    
    quantity         = models.IntegerField(default=1)
    price            = models.DecimalField(max_digits=12, decimal_places=2,default=0)
    
    attributevalue   = models.ForeignKey(AttributeValue, related_name=("relProductVariantValueAttributeValue"), on_delete=models.CASCADE, blank=True,null=True)
    content_type     = models.CharField(max_length=255, blank=True,null=True)     
        
    class Meta:
            db_table = 'product_variant_value'
            verbose_name = ("Product Variant Value")
            verbose_name_plural = ("Product Variant Values") 
            
    def __str__(self):
        return self.product.product_name
  
class ProductImage(models.Model):
      product     = models.ForeignKey(Product, related_name='relProductImageProduct', blank=True,null=True, on_delete=models.CASCADE)
      image       = models.ImageField(upload_to=pro_img_path(), max_length=255)
      main_thumb  = models.BooleanField(default=False)
      image_type  = models.IntegerField(default=0, 
                                          help_text=f"Field type: integer, Default value:0, Options:{dict(IMAGE_TYPE)}")
      product_variant_value = models.ForeignKey(ProductVariantValue, related_name='relProductImageProductVariantValue', blank=True,null=True, on_delete=models.CASCADE)
      
    
      class Meta:
            db_table = 'product_image'
            verbose_name = ("product image")
            verbose_name_plural = ("product images")
    
      def __str__(self):
            return self.product.product_name
      
      

class ProductAttribute(models.Model):
      product  = models.ForeignKey(Product, on_delete=models.CASCADE)
      type     = models.ForeignKey(DescriptionType, verbose_name=("Description Type"), on_delete=models.CASCADE, blank=True,null=True )
      options  = models.JSONField(null=True, blank=True)
      class Meta:
            db_table = 'product_detail'
            verbose_name = ("Product_detail")
            verbose_name_plural = ("Product details")

      def __str__(self):
            return self.product.product_name


class Wishlist(models.Model):
     user        = models.ForeignKey(Account, on_delete=models.CASCADE,null=True)
     product     = models.ForeignKey(Product, on_delete=models.CASCADE,null=True)
     created_at  = models.DateTimeField(auto_now=False, auto_now_add=True)
     updated_at  = models.DateTimeField(auto_now=True, auto_now_add=False)  
     class Meta:
         db_table= 'wishlist'  
         verbose_name =("Wishlist")
         verbose_name_plural =("Wishlists")
 
     def __str__(self):
         return self.product.product_name
 
     def get_absolute_url(self):
         return reverse("wishlist_detail", kwargs={"pk": self.pk})

         
class CompareList(models.Model):
    cart_id     = models.CharField(max_length=50, blank=True,null=True)
    product     = models.ForeignKey(Product, on_delete=models.CASCADE,null=True)
    created_at  = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True, auto_now_add=False)
    class Meta:
        db_table= 'compare_list'
        verbose_name =("Compare List")
        verbose_name_plural =("Compare Lists")

    def __str__(self):
        return self.product.product_name

    def get_absolute_url(self):
        return reverse("compare_list_detail", kwargs={"pk": self.pk})

 
