from django import template
from django.conf import settings

register = template.Library()


@register.simple_tag
def multiply(price, quantity):
      return (int(price)*quantity)


@register.simple_tag
def percentage_value(quantity, price):
      return settings.GST_RATE*(price*quantity)/100

@register.simple_tag
def sgst_cgst_rate():
      return settings.GST_RATE/2

@register.simple_tag
def igst_rate():
      return settings.GST_RATE


@register.filter
def range(val):
    return range(val)
