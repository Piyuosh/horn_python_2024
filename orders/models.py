from django.db import models
from accounts.models import Account, AddressBook
from store.models import Product
from cart.models import ApplyCouponCode
from constant.models import ORDER_STATUS, PAYMENT_STATUS

# Create your models here.
class Payment(models.Model):
    user           = models.ForeignKey(Account, on_delete=models.CASCADE, null=True, blank=True)
    payment_method = models.CharField(max_length=50)
       
    amount_paid    = models.FloatField(null=True, blank=True)
    currency_code  = models.CharField(max_length=50, null=True, blank=True)
    payer_email    = models.CharField(max_length=254, null=True, blank=True)
    payer_fullname = models.CharField(max_length=254, null=True, blank=True)
    payer_id       = models.CharField(max_length=50, null=True, blank=True)
    payer_address  = models.CharField(max_length=50, null=True, blank=True)  
    status         = models.CharField(("Payment Status"),
        default='Pending',
        max_length=254,
        blank=False,
        null=False,
    )    
    provider_order_id = models.CharField(("Order ID"), max_length=40, null=True, blank=True)
    payment_id        = models.CharField(("Payment ID"), max_length=36, null=True, blank=True)
    signature_id      = models.CharField(("Signature ID"), max_length=128, null=True, blank=True)
    created_at        = models.DateTimeField(auto_now=False, auto_now_add=True)   

    class Meta:
        db_table = 'payment'
        verbose_name = ("Payment")
        verbose_name_plural = ("Payments")

    def __str__(self):
        return self.payment_id

    # def get_absolute_url(self):
    #     return reverse("payment_detail", kwargs={"pk": self.pk})
    
class Order(models.Model):    
    user              = models.ForeignKey(Account, related_name="relOrderAccount", on_delete=models.SET_NULL, null=True)
    payment           = models.ForeignKey(Payment, related_name="relOrderPayment", on_delete=models.SET_NULL, null=True)
    order_number      = models.CharField(max_length=50, blank=True,null=True,)
    payment_type      = models.CharField(max_length=50, blank=True,null=True,)
    address_book      = models.ForeignKey(AddressBook, related_name="relOrderAddressBook", on_delete=models.CASCADE,blank=True,null=True)
    order_note        = models.TextField(blank=True,null=True)
    order_total       = models.FloatField(blank=True, null=True, default=0.0)
    tax               = models.FloatField(blank=True, null=True , default=0.0)
    apply_coupon      = models.ForeignKey(ApplyCouponCode, related_name="relOrderApplyCouponCode", on_delete=models.CASCADE,blank=True,null=True)
    discount          = models.FloatField(blank=True, null=True , default=0.0)
    status            = models.IntegerField(choices=ORDER_STATUS, default=1)
    quantity          = models.IntegerField(default=0)
    ip                = models.GenericIPAddressField(blank=True, null=True)
    is_ordered        = models.BooleanField(default=False)
    created_at        = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at        = models.DateTimeField(auto_now=True, auto_now_add=False)
    

    class Meta:
        db_table = 'orders'
        verbose_name = ("Order")
        verbose_name_plural = ("Orders")    
    
    def __str__(self):
        return self.order_number

    # def get_absolute_url(self):
    #     return reverse("order_detail", kwargs={"pk": self.pk})
    
class OrderProduct(models.Model):
    order = models.ForeignKey(Order, related_name='relOrderOrderProduct', on_delete=models.CASCADE)
    payment = models.ForeignKey(Payment, on_delete=models.SET_NULL, blank=True, null=True)
    user = models.ForeignKey(Account, on_delete=models.CASCADE, blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    # variation = models.ForeignKey(Veriation, on_delete=models.CASCADE)
    # color = models.CharField(max_length=50)
    # size = models.CharField(max_length=50)
    quantity = models.IntegerField()
    product_price = models.FloatField()
    ordered = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)    

    class Meta:
        db_table = 'order_products'
        verbose_name = ("Order Product")
        verbose_name_plural = ("Order Products")

    def __str__(self):
        return self.product.product_name

     # def get_absolute_url(self):
    #     return reverse("order_detail", kwargs={"pk": self.pk})

 