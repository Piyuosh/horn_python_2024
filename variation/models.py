from django.db import models
from django.urls import reverse
from frontend.models import Category
from constant.models import VARIASION_INPUT_TYPE


# Create your models here.
class AttributeName(models.Model):

    name = models.CharField(max_length=255) # e.g. color, size, shape, etc.
    slug = models.SlugField(max_length=250, unique=True, allow_unicode=True)    
    input_type = models.CharField(
        max_length=50,
        choices=VARIASION_INPUT_TYPE,
        default="dropdown",
    )
    category = models.ManyToManyField(Category)
    value_required = models.BooleanField(default=False, blank=True)
    is_variant_only = models.BooleanField(default=False, blank=True)
    visible_in_storefront = models.BooleanField(default=True, blank=True)

    filterable_in_storefront = models.BooleanField(default=False, blank=True)
    filterable_in_dashboard = models.BooleanField(default=False, blank=True)

    storefront_search_position = models.IntegerField(default=0, blank=True)
    available_in_grid = models.BooleanField(default=False, blank=True)
    
    created_at     = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at     = models.DateTimeField(auto_now=True, auto_now_add=False)
    
    class Meta:
        db_table = "attribute_name"
        verbose_name = ("Attribute Name")        

    def __str__(self):
        return self.name
    
    
    # def get_absolute_url(self):
    #     return reverse("_detail", kwargs={"pk": self.pk})


class AttributeValue(models.Model):
    attribute_name = models.ForeignKey(AttributeName, related_name="attr_values", on_delete=models.CASCADE)
    name = models.CharField(max_length=250)
    value = models.CharField(max_length=100, blank=True, default="")
    slug = models.SlugField(max_length=255, allow_unicode=True)
    content_type = models.CharField(max_length=50, null=True, blank=True)      
    
    status = models.BooleanField(default=True)
    
    created_at     = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at     = models.DateTimeField(auto_now=True, auto_now_add=False)   
    

    class Meta:
        db_table = "attribute_value"
        verbose_name = ("Attribute Value")

    def __str__(self):
        return self.attribute_name.name

    # def get_absolute_url(self):
    #     return reverse("_detail", kwargs={"pk": self.pk})
    
class VariationTheme(models.Model):
    name           = models.CharField(("Variation Theme"), max_length=255)
    pro_attr       = models.ManyToManyField(AttributeName, related_name="pro_attr", verbose_name=("Attribute Name")) 
    status         = models.BooleanField(default=True)   
    created_at     = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at     = models.DateTimeField(auto_now=True, auto_now_add=False)
    class Meta:
        db_table = 'variation_theme'
        verbose_name = ("Variation Theme")
        verbose_name_plural = ("Variation Themes")

    def __str__(self):
        return self.name

    # def get_absolute_url(self):
    #     return reverse("_detail", kwargs={"pk": self.pk})

class DescriptionType(models.Model):
    name = models.CharField(max_length=255) # e.g. color, size, shape, etc.
    slug = models.SlugField(max_length=250, unique=True, allow_unicode=True)    
    category = models.ManyToManyField(Category)
    created_at     = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at     = models.DateTimeField(auto_now=True, auto_now_add=False)

    class Meta:
        db_table = 'description_type'
        verbose_name =("Description Type")
        verbose_name_plural =("Description Types")

    def __str__(self):
        return self.name

    # def get_absolute_url(self):
    #     return reverse("DescriptionType_detail", kwargs={"pk": self.pk})


