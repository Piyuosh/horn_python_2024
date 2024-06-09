from django.contrib import admin
from .models import AttributeName, AttributeValue, VariationTheme, DescriptionType

class AttributeValueInline(admin.TabularInline):
    model = AttributeValue
    extra = 1
    prepopulated_fields = {'slug':('name',)}

class AttributeNameAdmin(admin.ModelAdmin):
    list_display = ('name','input_type','value_required','visible_in_storefront')
    readonly_fields = ('created_at',)
    ordering = ('created_at',)
    prepopulated_fields = {'slug':('name',)}
    inlines = [AttributeValueInline]

class DescriptionTypeAdmin(admin.ModelAdmin):
    list_display = ('name','slug')
    readonly_fields = ('created_at',)
    ordering = ('created_at',)
    prepopulated_fields = {'slug':('name',)}

# Register your models here.
admin.site.register(AttributeName, AttributeNameAdmin)
admin.site.register(DescriptionType, DescriptionTypeAdmin)
admin.site.register(VariationTheme)
