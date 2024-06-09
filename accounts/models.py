from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db.models.fields import CharField
from constant.models import ADDR_TYPE

PHONE_NUMBER_REGEX = RegexValidator(r'^\d{10}', message="Mobile number must be entered in the format: '+999999999'.")

class MyAccountManager(BaseUserManager):
    def create_user(self,first_name,last_name,username,email,password=None):
        if not email:
            raise ValueError('The Email field required.')
        if not username:
            raise ValueError('The Username field required.')
        user = self.model(
            email = self.normalize_email(email),
            username = username,
            first_name = first_name,
            last_name  = last_name
        )        
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_vendor_user(self,first_name,last_name,email,mobile_no,password=None):
        if not email:
            raise ValueError('The Email field required.')        
        user = self.model(
            email = self.normalize_email(email),
            username = first_name+' '+last_name,
            mobile_no= mobile_no,
            first_name = first_name,
            last_name  = last_name
        )        
        user.set_password(password)
        user.is_staff = True
        user.is_active = True
        user.save(using=self._db)
        return user
    
    def create_superuser(self,first_name,last_name,username,email,password):
        user = self.create_user(
            email = self.normalize_email(email),
            username = username,
            password = password,
            first_name = first_name,
            last_name  = last_name
            )
        user.is_admin = True
        user.is_active = True
        user.is_staff = True
        user.is_superadmin = True
        user.save(using=self._db)
        return user
        
# Create your models here.
class Account(AbstractBaseUser):
    first_name     = models.CharField(max_length =50)
    last_name      = models.CharField(max_length =50)
    username       = models.CharField(max_length =50, unique = True)
    email          = models.EmailField(max_length =100, unique= True)
    mobile_no      = models.CharField(max_length =50, validators=[PHONE_NUMBER_REGEX]) 
        
    is_admin       = models.BooleanField(default=False)
    is_staff       = models.BooleanField(default=False)
    is_active      = models.BooleanField(default=False)
    is_superadmin  = models.BooleanField(default=False)
    
    join_date      =  models.DateTimeField(auto_now_add = True,editable=False,null=True,blank=True)
    last_login     =  models.DateTimeField(auto_now = True,editable=False,null=True,blank=True)
    
    created_at     =  models.DateTimeField(auto_now_add=True,editable=False,null=True,blank=True),
    updated_at     =  models.DateTimeField(auto_now=True,editable=False,null=True,blank=True)
    
    class Meta:
        db_table = "accounts"
        
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name','last_name','username']
    
    objects = MyAccountManager()
    
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    def __str__(self):
        return self.email
    
    def has_perm(self,perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self,add_label):
        return True
    

class Country(models.Model):
    sortname   = models.CharField(max_length=50, null=True, blank=True)
    name       = models.CharField(max_length=50, null=True, blank=True)
    phonecode  = models.IntegerField(null=True, blank=True) 
    class Meta:
        db_table = "countries"
        verbose_name = ("Country")
        verbose_name_plural = ("Countries")

    def __str__(self):
        return self.name
    
class State(models.Model):
    name       = models.CharField(max_length=50, null=True, blank=True)
    country    = models.ForeignKey(Country, on_delete=models.CASCADE)
    class Meta:
        db_table = "states"
        verbose_name = ("State")
        verbose_name_plural = ("States")

    def __str__(self):
        return self.name

class City(models.Model):
    name       = models.CharField(max_length=50, null=True, blank=True)
    state      = models.ForeignKey(State, on_delete=models.CASCADE)   

    class Meta:
        db_table = "cities"
        verbose_name = ("City")
        verbose_name_plural = ("Cities")

    def __str__(self):
        return self.name
    
class UserProfile(models.Model):
    user          = models.OneToOneField(Account, related_name='user_profile', on_delete=models.CASCADE)
    avatar        = models.ImageField(upload_to='user_avatar/', null=True, blank=True)
    country       = models.ForeignKey(Country, on_delete=models.CASCADE, null=True, blank=True)
    state         = models.ForeignKey(State, on_delete=models.CASCADE, null=True, blank=True)
    city          = models.ForeignKey(City, on_delete=models.CASCADE, null=True, blank=True)
    zip_code      = models.CharField(max_length=50, null=True, blank=True)
    company       = models.CharField(max_length=50, null=True, blank=True)
    pan_number    = models.CharField(max_length=50, null=True, blank=True)
    gstin         = models.CharField(max_length=50, null=True, blank=True)
    address_line1 = models.TextField(null=True, blank=True)
    address_line2 = models.TextField(null=True, blank=True)
    created_at    = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at    = models.DateTimeField(auto_now=True, auto_now_add=False)
    
    class Meta:
        db_table = "user_profile"
        
    def full_address(self):
        return f"{self.address_line1} {self.address_line2}"
    
    def __str__(self):
        return self.user.first_name
class AddressBook(models.Model):
    
    user             = models.ForeignKey(Account, on_delete=models.CASCADE, null=True, blank=True)
    user_cookie      = models.CharField(max_length=50, null=True, blank=True)
    addr_type        = models.CharField(max_length=50, choices=ADDR_TYPE, default='shipping')
    shipping_title   = models.CharField(max_length=50, null=True, blank=True)
    first_name       = models.CharField(max_length=50, null=True, blank=True)
    last_name        = models.CharField(max_length=50, null=True, blank=True)
    contact_mobile1  = models.CharField(max_length=50, null=True, blank=True)
    contact_mobile2  = models.CharField(max_length=50, null=True, blank=True)
    email            = models.EmailField(max_length=254, null=True, blank=True)
    country          = models.ForeignKey(Country, on_delete=models.CASCADE, null=True, blank=True)
    state            = models.ForeignKey(State, on_delete=models.CASCADE, null=True, blank=True)
    city             = models.ForeignKey(City, on_delete=models.CASCADE, null=True, blank=True)
    zip_code         = models.CharField(max_length=50, null=True, blank=True)
    company          = models.CharField(max_length=50, null=True, blank=True)
    pan_number       = models.CharField(max_length=50, null=True, blank=True)
    gstin            = models.CharField(max_length=50, null=True, blank=True)
    address_line1    = models.CharField(max_length=255,null=True, blank=True)
    address_line2    = models.CharField(max_length=255,null=True, blank=True)
    created_at       = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at       = models.DateTimeField(auto_now=True, auto_now_add=False)
    class Meta:
        db_table    = 'address_book'
        verbose_name = ("Address Book")
        verbose_name_plural = ("Address Books")

    def __str__(self):
        return self.first_name+' '+self.last_name





    


   