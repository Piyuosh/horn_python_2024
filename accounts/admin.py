from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html
from .models import Account, UserProfile

# Register your models here.
class AccountAdmin(UserAdmin):
    list_display = ('email','first_name','last_name','username','join_date','last_login','is_active')
    list_display_links = ('email','first_name','last_name')
    readonly_fields = ('join_date','last_login')
    ordering = ('join_date',)
    
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

class UserProfileAdmin(admin.ModelAdmin):
    def thumbnail(self, object):
        return format_html('<img src="{}" width="50" style="border-radius:50%">'.formate(object.avatar.url))
    thumbnail.short_description = "Profile Picture"
    list_display = ('thumbnail','user', 'city','state','country')

admin.site.register(Account,AccountAdmin)
admin.site.register(UserProfile,UserProfileAdmin)
