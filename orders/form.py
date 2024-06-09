from django import forms
from .models import Order
from accounts.models import AddressBook

class OrderForm(forms.ModelForm):
    address_book = forms.ModelChoiceField(queryset=AddressBook.objects.all(), required=True)
    payment_type = forms.CharField(required=True)
    class Meta:
        model = Order
        fields = ['address_book','payment_type']
