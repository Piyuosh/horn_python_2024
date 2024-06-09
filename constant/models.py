from django.db import models

# Create your models here.

VARIASION_INPUT_TYPE = [
        ("dropdown", "Dropdown"),
        ("multiselect", "Multi Select"),
        ("file", "File"),
        ("reference", "Reference"),
        ("numeric", "Numeric"),
        ("rich-text", "Rich Text"),
        ("boolean", "Boolean"),
    ]
ADDR_TYPE = [
        ('shipping', 'shipping'),
        ('billing', 'billing'),
]

BANNER_POSITION = [
        (1, 'Home Top'),
        (2, 'Home Left'),
        (3, 'Home Right'),
        (4, 'Home Header'),
        (5, 'Category Page'),
]

BOOLEAN_VALUE = [
        (0, 'No'),
        (1, 'Yes'),      
]

STATUS_VALUE = [
        (0, 'Inactive'),
        (1, 'Active'),      
]

DISCOUNT_TYPE = [
        (0, '% Percentage'),
        (1, 'Fixed'),      
]

ORDER_STATUS = [
        (1, 'New'),
        (2, 'Accepted'),        
        (3, 'Shipped'),
        (4, 'In Transit'),
        (5, 'Delivered'),
        (6, 'Completed'),
        (7, 'Cancelled'),
]

PAYMENT_STATUS = [
        ("SUCCESS", "Success"),
        ("FAILURE", "Failure"),
        ("PENDING", "Pending"),
        ("CREATED", "Created"),
]

IMAGE_TYPE = [
        (0, 'Default Product image'),
        (1, 'Variation image')
]