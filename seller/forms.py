from enum import unique
from django import forms
from accounts.models import Account, UserProfile
from store.models import Product
from variation.models import VariationTheme

class RegisterForms(forms.ModelForm):   
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder' :'Enter Password'
    } )) 
    confirm_password = forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder' :'Confirm Password'
    } )) 
    class Meta:
        model = Account
        fields = ['first_name','last_name','email','mobile_no','password']
        
    def __init__(self, *args, **kwargs):
        super(RegisterForms, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'form-control'      
            self.fields[field].widget.attrs['placeholder'] = 'Please enter '+ field.replace('_',' ')
   
    def clean(self):
        cleaned_data = super(RegisterForms, self).clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')
        if password != confirm_password:
            raise forms.ValidationError(
                'Confirm password does not match'
                )
class LoginForms(forms.Form):
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder' :'Enter Password'
    } ), required=True) 
    email = forms.EmailField(required=True)
    class Meta:
        # model = Account
        fields = ['email','password']
        
    def __init__(self, *args, **kwargs):
        super(LoginForms, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'form-control'      
            self.fields[field].widget.attrs['placeholder'] = 'Please enter '+ field.replace('_',' ')
            
class ForgotForms(forms.Form):
    email = forms.EmailField(required=True)
    class Meta:
        # model = Account
        fields = ['email']
        
    def __init__(self, *args, **kwargs):
        super(ForgotForms, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'form-control'      
            self.fields[field].widget.attrs['placeholder'] = 'Please enter '+ field.replace('_',' ')
            
class ResetPasswordForms(forms.Form):
    password = forms.CharField(widget=forms.PasswordInput(attrs={
            'placeholder' :'Enter Password'
        } )) 
    confirm_password = forms.CharField(widget=forms.PasswordInput(attrs={
            'placeholder' :'Confirm Password'
        } ))    
    class Meta:
        # model = Account
        fields = ['password','confirm_password']
        
    def __init__(self, *args, **kwargs):
        super(ResetPasswordForms, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'form-control'      
            self.fields[field].widget.attrs['placeholder'] = 'Please enter '+ field.replace('_',' ')
    
    def clean(self):
        cleaned_data = super(ResetPasswordForms, self).clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')
        if password != confirm_password:
            raise forms.ValidationError(
                'Confirm password does not match'
                )
            
class UserForm(forms.ModelForm):                
    class Meta:
        model = Account
        fields = ("first_name","last_name","mobile_no","email")
        
    def __init__(self, *args, **kwargs):
        super(UserForm, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'form-control'      
            self.fields[field].widget.attrs['placeholder'] = 'Please enter '+ field.replace('_',' ')
            
class UserProfileForm(forms.ModelForm):
    avatar = forms.ImageField(required =False,error_messages={'invalid':('Image file only')}, widget=forms.FileInput)    
    class Meta:
        model = UserProfile
        fields = ("avatar","country","state","city","address_line1","address_line2")
          
    def __init__(self, *args, **kwargs):
        super(UserProfileForm, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'form-control'      
            self.fields[field].widget.attrs['placeholder'] = 'Please enter '+ field.replace('_',' ')
 
class ProductForm(forms.Form):
    product_name         = forms.CharField()
    short_desc           = forms.CharField(widget=forms.Textarea(attrs={'rows':2}))
    long_desc            = forms.CharField(widget=forms.Textarea(attrs={'rows':3}))
    meta_title           = forms.CharField(max_length=200)
    meta_description     = forms.CharField(required=False,widget=forms.Textarea(attrs={'rows':3}))
    meta_keyword         = forms.CharField(required=False,widget=forms.Textarea(attrs={'rows':3})) 
    quantity             = forms.IntegerField()  
    regular_price        = forms.DecimalField()
    sale_price           = forms.DecimalField() 
    # shipping_cost        = forms.DecimalField()   
    class Meta:
         model = Product
         fields = ("product_name","short_desc","long_desc")
         
    def __init__(self, *args, **kwargs):
        super(ProductForm, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'form-control'      
            self.fields[field].widget.attrs['placeholder'] = 'Please enter '+ field.replace('_',' ')
class VariationThemeForm(forms.Form):
    variation_theme = forms.ModelChoiceField(
                    queryset = VariationTheme.objects.all(),
                    initial = 0,
                    required = False,                    
                    widget=forms.Select(attrs={'id': 'variation_theme', 'onChange':'getVariationAttribute(this.value)'}),
                    )   
    class Meta:
        model = VariationTheme
        fields = ("variation_theme",)
        
    def __init__(self, *args, **kwargs):
        super(VariationThemeForm, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'form-control'      
            self.fields[field].widget.attrs['placeholder'] = 'Please enter '+ field.replace('_',' ')
        