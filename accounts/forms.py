from django import forms
from .models import Account, Country, UserProfile, State, City, AddressBook
# from captcha.fields import ReCaptchaField
# from captcha.widgets import ReCaptchaV2Checkbox

class RegisterForms(forms.ModelForm):   
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder' :'Enter Password'
    } )) 
    confirm_password = forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder' :'Confirm Password'
    } )) 
    class Meta:
        model = Account
        fields = ['first_name','last_name','email','password']
        
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
            raise forms.ValidationError({'confirm_password': ["Confirm password does not match",]})
        
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
    avatar = forms.CharField(widget=forms.HiddenInput(attrs={'id': 'avatar_img'})) 
    state = forms.ModelChoiceField(
                    queryset = State.objects.all(),
                    initial = 0,
                    required = False,                    
                    widget=forms.Select(attrs={'id': 'pro_state'}),
                    )   
    city = forms.ModelChoiceField(
                    queryset = City.objects.all(),
                    initial = 0,
                    required = False,
                    widget=forms.Select(attrs={'id': 'pro_city'}),
                    )
    address_line1 = forms.CharField(
                        widget=forms.Textarea(attrs={'rows':3})
                        )  
    address_line2 = forms.CharField(
                        widget=forms.Textarea(attrs={'rows':3})
                        )   
    class Meta:
        model = UserProfile
        fields = ("avatar","country","state","city","address_line1","address_line2")
          
    def __init__(self, *args, **kwargs):
        super(UserProfileForm, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'form-control'      
            self.fields[field].widget.attrs['placeholder'] = 'Please enter '+ field.replace('_',' ')

class ResetPasswordForms(forms.Form):
    current_password = forms.CharField(widget=forms.PasswordInput(attrs={
            'placeholder' :'Enter Current Password'
        } )) 
    new_password = forms.CharField(widget=forms.PasswordInput(attrs={
            'placeholder' :'Enter New Password'
        } )) 
    confirm_password = forms.CharField(widget=forms.PasswordInput(attrs={
            'placeholder' :'Confirm Password'
        } ))    
    class Meta:
        # model = Account
        fields = ['current_password','new_password','confirm_password']
        
    def __init__(self, *args, **kwargs):        
        super(ResetPasswordForms, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'form-control'      
            self.fields[field].widget.attrs['placeholder'] = 'Please enter '+ field.replace('_',' ')
       
    def clean(self):
        cleaned_data = super(ResetPasswordForms, self).clean()
        password = cleaned_data.get('new_password')
        confirm_password = cleaned_data.get('confirm_password')
        if password != confirm_password:
            self.add_error('confirm_password', "Confirm password does not match")

ADD_TITLE_CHOICES = [
    ('default', 'Default'),
    ('home', 'Home'),
    ('work', 'Work'),
    ('other', 'Other'),
]
class ShippingForm(forms.ModelForm):    
    shipping_title   = forms.ChoiceField(initial="default",widget=forms.RadioSelect, choices=ADD_TITLE_CHOICES)
    # shipping_title = forms.ChoiceField(initial="default",
    #     widget=forms.CheckboxSelectMultiple(),
    #     choices=ADD_TITLE_CHOICES
    # )
    addr_type        = forms.CharField(widget=forms.HiddenInput(),initial="shipping")
    first_name       = forms.CharField(max_length = 20,)
    last_name        = forms.CharField(max_length = 20,)
    contact_mobile1  = forms.CharField(max_length = 10, 
                            widget=forms.TextInput(attrs={'placeholder': 'Please enter contact mobile number'}))
    contact_mobile2  = forms.CharField(required = False,max_length = 10, 
                            widget=forms.TextInput(attrs={'placeholder': 'Please enter alternate mobile number'}))
    email            = forms.EmailField(max_length = 100,)
    country          = forms.ModelChoiceField(
                    queryset = Country.objects.all(),
                    initial = 0,                   
                    widget=forms.Select(attrs={'id': 'add_country','onchange': 'getState(this.value)'}),
                    )  
    state = forms.ModelChoiceField(
                    queryset = State.objects.all(),
                    initial = 0,                   
                    widget=forms.Select(attrs={'id': 'add_state','onchange': 'getCity(this.value)'}),
                    )   
    city = forms.ModelChoiceField(
                    queryset = City.objects.all(),
                    initial = 0,
                    widget=forms.Select(attrs={'id': 'add_city'}),
                    )
    address_line1 = forms.CharField(
                        widget=forms.Textarea(attrs={'rows':2,'id': 'addr_book_line1'})
                        )  
    address_line2 = forms.CharField(
                        required = False,
                        widget=forms.Textarea(attrs={'rows':2,'id': 'addr_book_line2'})
                        )   
    zip_code         = forms.CharField( 
                    widget=forms.TextInput(attrs={'placeholder': 'Please enter POSTCODE / ZIP cod'}))
    
    same_as_shipping = forms.BooleanField(required=False, initial=True)
    
    
    class Meta:
        model = AddressBook
        fields = ('shipping_title','addr_type','first_name','last_name','contact_mobile1','contact_mobile2','email','country','state','city','address_line1','address_line2','zip_code',)
    
    def __init__(self, *args, **kwargs):        
        super(ShippingForm, self).__init__(*args, **kwargs)
        for field in self.fields:
            if field is not 'same_as_shipping':
                self.fields[field].widget.attrs['class'] = 'form-control'      
                self.fields[field].widget.attrs['placeholder'] = 'Please enter '+ field.replace('_',' ')

class BillingForm(forms.ModelForm):    
    addr_type        = forms.CharField(widget=forms.HiddenInput(),initial="billing")
    first_name       = forms.CharField(max_length = 20,)
    last_name        = forms.CharField(max_length = 20,)
    contact_mobile1  = forms.CharField(max_length = 10, 
                            widget=forms.TextInput(attrs={'placeholder': 'Please enter contact mobile number'}))
    contact_mobile2  = forms.CharField(required = False,max_length = 10, 
                            widget=forms.TextInput(attrs={'placeholder': 'Please enter alternate mobile number'}))
    email            = forms.EmailField(max_length = 100,)
    country          = forms.ModelChoiceField(
                    queryset = Country.objects.all(),
                    initial = 0,                   
                    widget=forms.Select(attrs={'id': 'add_country','onchange': 'getState(this.value)'}),
                    )  
    state = forms.ModelChoiceField(
                    queryset = State.objects.all(),
                    initial = 0,                   
                    widget=forms.Select(attrs={'id': 'add_state','onchange': 'getCity(this.value)'}),
                    )   
    city = forms.ModelChoiceField(
                    queryset = City.objects.all(),
                    initial = 0,
                    widget=forms.Select(attrs={'id': 'add_city'}),
                    )
    address_line1 = forms.CharField(
                        widget=forms.Textarea(attrs={'rows':2})
                        )  
    address_line2 = forms.CharField(
                        required = False,
                        widget=forms.Textarea(attrs={'rows':2})
                        )   
    zip_code         = forms.CharField( 
                    widget=forms.TextInput(attrs={'placeholder': 'Please enter POSTCODE / ZIP cod'}))
    company          = forms.CharField(
                            required = False, 
                            widget=forms.TextInput(attrs={'placeholder': 'Please enter company nam'}))
    pan_number       = forms.CharField(
                            required = False, 
                            widget=forms.TextInput(attrs={'placeholder': 'Please enter PAN numbe'}))
    gstin            = forms.CharField(
                            required = False, 
                            widget=forms.TextInput(attrs={'placeholder': 'Please enter GSTIN numbe'}))
    same_as_shipping = forms.BooleanField(required=False, initial=True)
    
    
    class Meta:
        model = AddressBook
        fields = ('addr_type','first_name','last_name','contact_mobile1','contact_mobile2','email','country','state','city','address_line1','address_line2','zip_code','company','pan_number','gstin','same_as_shipping')
    
    def __init__(self, *args, **kwargs):        
        super(BillingForm, self).__init__(*args, **kwargs)
        for field in self.fields:
            if field is not 'same_as_shipping':
                self.fields[field].widget.attrs['class'] = 'form-control'      
                self.fields[field].widget.attrs['placeholder'] = 'Please enter '+ field.replace('_',' ')
      
        