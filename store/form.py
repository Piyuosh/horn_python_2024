from django import forms
from django.contrib import admin
from .models import ReviewRating, Product, ProductVariant

class ReviewForm(forms.ModelForm):
    class Meta:
        model = ReviewRating
        fields = ['subject','review','rating']

class ProductAdminForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ('__all__')
        widgets = {
            'short_desc': forms.Textarea(attrs={'cols': 80, 'rows': 5}),
            'meta_description': forms.Textarea(attrs={'cols': 80, 'rows': 5}),
        }
class ProductVariantAdminForm(forms.ModelForm):
    class Meta:
        model= ProductVariant
        fields = ('__all__')
        widgets = {
            'variation': forms.Select(attrs={'onchange':'getVariationValueInline(this.value);'}),
            'sku': forms.TextInput(attrs={'size': 10}),
            'title': forms.TextInput(attrs={'size': 30}),
            'variation_value': forms.Select()
        }
        
        