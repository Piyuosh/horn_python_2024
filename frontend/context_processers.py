from .models import Category
from accounts.models import Country

def left_menu_bar(request):
   category = Category.objects.all().filter(parent=None, status =True)   
   return dict(categories = category)

def country(request):
    country = Country.objects.all()
    return dict(country = country)