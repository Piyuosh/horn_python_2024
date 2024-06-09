from django.db import models
from django.conf import settings
from django.utils import timezone
from django.core.validators import RegexValidator
from django.urls import reverse
from uuid import uuid4
import random, string

def random_sku(n):
     return ''.join(random.choices(string.ascii_uppercase+string.digits,k=n))

def cat_img_path():
     return 'cat_img/%Y/%m/%d/'

def generateUUID():
    return str(uuid4())

# Categories models
class Category(models.Model):  
   uuid           =  models.UUIDField(default=generateUUID, max_length=36, unique=True, editable=False)
   category_name  =  models.CharField(max_length= 100, unique =True, null=True, blank=True)
   slug           =  models.SlugField(max_length=100, unique=True) 
   order          =  models.IntegerField(default=0,null=True, blank=True)
   parent         =  models.ForeignKey('self',blank=True, null=True ,related_name='children',verbose_name=("Parent Category"), on_delete=models.CASCADE)
   linkable       =  models.BooleanField(default=1)
   status         =  models.IntegerField(default = 1,
                                    blank = True,
                                    null = True,
                                    help_text ='1->Active, 0->Inactive', 
                                    choices =(
                                    (1, 'Active'), (0, 'Inactive')
                                    ))
   short_desc     =  models.TextField(null=True, blank=True)
   meta_keyword   =  models.TextField(null=True, blank=True)   
   cat_sample_img =  models.ImageField(upload_to=cat_img_path(), max_length=50, null = True, blank = True)
   cat_img        =  models.ImageField(upload_to=cat_img_path(), max_length=50, null = True, blank = True)
   created_at     =  models.DateTimeField(auto_now_add=True,editable=False,null = True,blank=True)
   updated_at     =  models.DateTimeField(auto_now=True,editable=False,null = True,blank=True)
   
#    created_at = models.DateTimeField(default = timezone.now)
#    updated_at = models.DateTimeField(default = timezone.now, null = True, blank = True)
    
   class Meta:
        db_table = "categories"
        # Add verbose name
        verbose_name = 'Category List'
        verbose_name_plural = 'categories'

   def __str__(self):
        return self.category_name

   def get_absolute_url(self):
      return reverse('product_by_category', args=[self.slug])
 
class ContactUs(models.Model):
     name           = models.CharField(max_length=50)     
     mobile         = models.CharField(
                         max_length=16,
                         blank=True,
                         null=True,
                         validators=[
                              RegexValidator(
                              regex=r'^\+?1?\d{9,12}$',
                              message="Mobile number must be entered in the format '+123456789'. Up to 12 digits allowed."
                              ),
                         ],)
     email          = models.EmailField(max_length=254)
     message        = models.TextField()
     created_at     = models.DateTimeField(auto_now_add=True,editable=False,null = True,blank=True)
     updated_at     = models.DateTimeField(auto_now=True,editable=False,null = True,blank=True)
 
     class Meta:
         verbose_name =("Contact us")
         verbose_name_plural =("Contact us")
 
     def __str__(self):
         return self.name
 
 


