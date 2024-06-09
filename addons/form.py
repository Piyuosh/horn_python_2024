from django import forms
from django.contrib import admin
from .models import Coupon
from frontend.models import Category
from store.models import Product

class CouponForm(forms.ModelForm):
    category = forms.MultipleChoiceField(choices=[(item.id, item.category_name) for item in Category.objects.all()], required=False)
    product = forms.MultipleChoiceField(choices=[(item.id, item.product_name) for item in Product.objects.all()], required=False)

    class Meta:
        model = Coupon
        fields = ('code','valid_from','valid_to','category','product','discount_type','discount','status')


