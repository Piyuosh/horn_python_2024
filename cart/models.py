from django.db import models
from store.models import Product
from accounts.models import Account
from addons.models import Coupon

# Create your models here.
class Cart(models.Model):
    cart_id        = models.CharField(max_length=255, null= True, blank= True)
    created_at     = models.DateTimeField(auto_now_add=True,editable=False,null = True,blank=True)
    updated_at     = models.DateTimeField(auto_now=True,editable=False,null = True,blank=True)    

    class Meta:
        db_table = "cart"
        # Add verbose name
        #verbose_name = 'Cart List'
        # verbose_name_plural = 'categories'

    def __str__(self):
        return self.cart_id

    # def get_absolute_url(self):
    #     return reverse("_detail", kwargs={"pk": self.pk})
    
class CartItem(models.Model):
    user           = models.ForeignKey(Account, on_delete=models.CASCADE, null =True)
    product        = models.ForeignKey(Product, on_delete=models.CASCADE,null =True)
    cart           = models.ForeignKey(Cart, on_delete=models.CASCADE, null=True)
    quantity       = models.IntegerField()
    status         = models.BooleanField(default =True)
    created_at     = models.DateTimeField(auto_now_add=True,editable=False,null = True,blank=True)
    updated_at     = models.DateTimeField(auto_now=True,editable=False,null = True,blank=True) 
    
      
    class Meta:
        db_table = "cart_items"
        # Add verbose name
        verbose_name = 'Cart Item'
        # verbose_name_plural = 'categories'
    def sub_total(self):
            return self.product.sale_price * self.quantity 
        
    def __unicode__(self):
        return self.product

class ApplyCouponCode(models.Model):
    user           = models.ForeignKey(Account, on_delete=models.CASCADE, null=True)
    cart           = models.ForeignKey(Cart, on_delete=models.CASCADE, null=True)
    coupon         = models.ForeignKey(Coupon, on_delete=models.CASCADE, null=True)
    status         = models.BooleanField(default=False)
    created_at     = models.DateTimeField(auto_now_add=True,editable=False,null=True,blank=True)
    updated_at     = models.DateTimeField(auto_now=True,editable=False,null=True,blank=True) 
    
      
    class Meta:
        db_table = "apply_coupon_code"
        # Add verbose name
        verbose_name = 'Applied Coupon Code'
        # verbose_name_plural = 'categories'
    
