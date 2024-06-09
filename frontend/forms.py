from accounts.models import Country, State
from frontend.context_processers import country
from django.core.validators import RegexValidator
from django import forms
# from captcha.fields import ReCaptchaField
# from captcha.widgets import ReCaptchaV2Checkbox
from .models import ContactUs

class ContactUsForm(forms.ModelForm):
    email    = forms.EmailField()
    message  = forms.CharField(widget=forms.Textarea)
    # captcha  = ReCaptchaField(widget=ReCaptchaV2Checkbox)
    
    class Meta:
        model = ContactUs
        fields = ("name","mobile",'email',"message")
    
    def __init__(self, *args, **kwargs):        
        super(ContactUsForm, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'form-control'      
            self.fields[field].widget.attrs['placeholder'] = 'Please enter '+ field.replace('_',' ')
          
class ShippingEstimateForm(forms.Form):
    country     = forms.ModelChoiceField(
                    queryset = Country.objects.all(),
                    initial = 101,                   
                    widget=forms.Select(attrs={'id': 'add_country','onchange': 'getState(this.value)'}),
                    )  
    state       = forms.ModelChoiceField(
                    queryset = State.objects.all(),
                    initial = 1,       
                    widget=forms.Select(attrs={'id': 'add_state'}),
                    )   
    zip_code    = forms.IntegerField(required=False)
    class Meta:
        model = ContactUs
        fields = ("country","state","zip_code")
    
    def __init__(self, *args, **kwargs):        
        super(ShippingEstimateForm, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'form-control'      
            self.fields[field].widget.attrs['placeholder'] = 'Please enter '+ field.replace('_',' ')

