from django.urls import path
from . import views

urlpatterns = [
    # pages urls
    path('', views.variations, name="create.variation"),
    path('variant-value',views.variant_value, name="variant.value")
      
    # end pages urls
]