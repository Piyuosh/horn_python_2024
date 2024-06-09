from django.urls import path
from store import views

urlpatterns = [
    # pages urls
    path('', views.cat_product, name="category_product"),
    path('<slug:category_slug>/', views.cat_product, name="product_by_category"), 
    path('review/<int:product_id>/', views.review_rating, name='review_rating'),
    path('cat-filter-product', views.cat_filter_product, name='cat.filter.product'),   
    # end pages urls
]