from django.contrib import admin
from .models import Category

# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('category_name','slug','status','created_at')
    readonly_fields = ('created_at',)
    ordering = ('category_name',)
    prepopulated_fields = {'slug':('category_name',)}
    
admin.site.register(Category,CategoryAdmin)
