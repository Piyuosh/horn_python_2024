from django.db import models
from constant.models import BANNER_POSITION, DISCOUNT_TYPE, STATUS_VALUE
from django.core.validators import MinValueValidator, MaxValueValidator
from frontend.models import Category
from store.models import Product

# Create your models here.


class Banner(models.Model):
    id             = models.BigAutoField(primary_key=True)
    banner_img     = models.ImageField(upload_to="banner_img/%Y/%m/%d", null=True,help_text="Field type:image.")
    position       = models.IntegerField(choices=BANNER_POSITION, default=1, null=True, help_text="Field type:select, Default:1, value:{dict(BANNER_POSITION)}")
    offer_text     = models.CharField(max_length=255, null=True, blank=True, help_text="Field type: string, Ex. 50% off")
    offer_link     = models.CharField(max_length=255, null=True, blank=True, help_text="Field type: string, Ex. Offer redirect link")
    other_text     = models.CharField(max_length=255, null=True, blank=True, help_text="Field type: string, Ex. Other information")
    other_text_2   = models.CharField(max_length=255, null=True, blank=True, help_text="Field type: string, Ex. Other information 2")
    active         = models.BooleanField(default=True)
    created_at     = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at     = models.DateTimeField(auto_now=True, auto_now_add=False) 

    class Meta:
        verbose_name = ("Banner")
        verbose_name_plural = ("Banners")

    


class BannerText(models.Model):
    id             = models.BigAutoField(primary_key=True)
    text_input     = models.CharField(max_length=255, help_text="Field type: string.", null=True)
    banner         = models.ForeignKey(Banner, related_name="revBannerText", verbose_name=("Banner"), on_delete=models.CASCADE, null=True)
    created_at     = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at     = models.DateTimeField(auto_now=True, auto_now_add=False) 

    class Meta:
        verbose_name = ("Banner Text")
        verbose_name_plural = ("Banner Text")


class Coupon(models.Model):
    code            = models.CharField(max_length=10, unique=True, null=True)    
    valid_from      = models.DateTimeField()
    valid_to        = models.DateTimeField()
    # category        = models.ForeignKey(Category, on_delete=models.CASCADE, null = True, related_name="relCategoryCoupon", verbose_name="Category Ids")
    # product         = models.ForeignKey(Product, on_delete=models.CASCADE, null = True, related_name="relProductCoupon", verbose_name="Product Ids")
    category        = models.JSONField(null = True,verbose_name="Category Ids")
    product         = models.JSONField(null = True, verbose_name="Product Ids")
    discount_type   = models.IntegerField(choices=DISCOUNT_TYPE, null=True, default=0, help_text="Field type:select, Default: % Percentage, value:{dict(DISCOUNT_TYPE)}")
    discount        = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(90)])
    status          = models.BooleanField(choices=STATUS_VALUE,  default=1, help_text="Field type:boolean, Default: Active, value:{dict(STATUS_VALUE)}")
    created_at      = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at      = models.DateTimeField(auto_now=True, auto_now_add=False) 
    

    class Meta:
        verbose_name = ("Coupon")
        verbose_name_plural = ("Coupons")

    def __str__(self):
        return self.code



   

    