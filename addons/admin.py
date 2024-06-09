from django.contrib import admin

from addons.form import CouponForm
from .models import BannerText, Banner, Coupon

# Register your models here.
class BannerTextInline(admin.TabularInline):
    model = BannerText
    extra =1

class BannerAdmin(admin.ModelAdmin):
    list_display = ('id','position','active','created_at')
    readonly_fields = ('created_at',)
    ordering = ('created_at',)
    # inlines = [BannerTextInline]

class CouponAdmin(admin.ModelAdmin):
    list_display = ('code','valid_from','valid_to','discount_type','discount','status','created_at')
    readonly_fields = ('created_at',)
    ordering = ('created_at',)

    form = CouponForm



admin.site.register(Banner, BannerAdmin)
admin.site.register(Coupon, CouponAdmin)
# admin.site.register(BannerText)
