from django.urls import path
from frontend import views

urlpatterns = [
    # pages urls
    path('', views.index, name="home"),    
           
    # end pages urls
]