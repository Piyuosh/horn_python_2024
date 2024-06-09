from django.core.files.base import ContentFile
from django.conf import settings
from django.template.loader import get_template
from django.http import HttpResponse
import os, traceback, sys

import math, datetime, os, io, base64, uuid
from weasyprint import HTML, CSS

from cart.models import ApplyCouponCode
from orders.models import Order, OrderProduct


# get and create session id
def _cart_id(request):    
    cart = request.COOKIES.get('cart_key')     
    return cart

def percentage(part, whole):
  return (part * whole) / 100

def calculate_coupon_price(request, grand_total):
    coupon = ApplyCouponCode.objects.filter(cart__cart_id=_cart_id(request), status=False).order_by('-id').first()
    discount=None
    discount_type=None
    if coupon:
        discount_type = coupon.coupon.discount_type
        discount = coupon.coupon.discount        
        if discount_type == 0:
            discount_type = f"({discount}%)"        
            discount = percentage(discount, grand_total)
            grand_total = grand_total-discount
            discount = round(discount,2)
        else:
            discount_type = f"({discount} F)"  
            grand_total = grand_total-discount
            discount = round(discount,2)
    return discount_type, discount, float(math.ceil(round(grand_total,2)))

class Generate_pdf:

    def generate_invoice_pdf(self, html_template, action_type="view"):       
        pdf_file = HTML(string=html_template, base_url="").write_pdf(presentational_hints=True,
                                                        stylesheets=[
                                                                    CSS(
                                                                        string='body { font-family: Times New Roman !important;'
                                                                                ' font-size:12px; }'),
                                                                    CSS(
                                                                        string='@page {size: A4 portrait; margin: 0.1cm 0.3cm 0.3cm 0.3cm;'                                                                            
                                                                                '}')
                                                                ])
        response = HttpResponse(pdf_file, content_type='application/pdf')
        
        if action_type == "download":
            response['Content-Disposition'] = 'attachment; filename="invoice{order_number}.pdf"'
        else:
            response['Content-Disposition'] = 'filename="invoice{order_number}.pdf"'
        
        return response

    def save_invoice_pdf(self, html_template, order_no):       
        OUTPUT_DIR = f"{settings.MEDIA_ROOT}/invoices/"
        OUTPUT_FILENAME = f"invoice-{order_no}.pdf"
        report = os.path.join(OUTPUT_DIR, OUTPUT_FILENAME)
        pdf_file = HTML(string=html_template, base_url="").write_pdf(report, presentational_hints=True,
                                                        stylesheets=[
                                                                    CSS(
                                                                        string='body { font-family: Times New Roman !important;'
                                                                                ' font-size:12px; }'),
                                                                    CSS(
                                                                        string='@page {size: A4 portrait; margin: 0.1cm 0.3cm 0.3cm 0.3cm;'                                                                            
                                                                                '}')
                                                                ])
        response = HttpResponse(pdf_file, content_type='application/pdf')
        return response

def generate_random_number(item_id, item_type=None):
    yr = int(datetime.date.today().strftime('%Y'))
    dt = int(datetime.date.today().strftime('%d'))
    mt = int(datetime.date.today().strftime('%m'))
    d = datetime.date(yr,mt,dt)
    current_date = d.strftime('%Y%m%d')
    return f"HM-{item_type}{current_date+str(item_id)}"

def ordered_data(order_id):
    order_detail = OrderProduct.objects.filter(order__order_number=order_id)
    order = Order.objects.filter(order_number = order_id).first()
    
    tax= 0
    grant_total = 0
    subtotal= 0
    quantity = 0
    for item in order_detail:
            subtotal += (item.product.sale_price * item.quantity) 
            quantity += item.quantity
    tax = (settings.GST_RATE*subtotal)/100
    grant_total = subtotal+tax
     
    context = {
        'order_detail': order_detail,
        'order':order,
        'subtotal':subtotal,
        'tax':tax,
        'grant_total':grant_total
    }
    return context
def base64_img(base64_string):
    format, img_str = base64_string.split(';base64,') 
    ext = format.split('/')[-1]
    variation_img = ContentFile(base64.b64decode(img_str), name=str(uuid.uuid4())[:12]+'.'+ext)
    return variation_img


def exception_details():
    exc_type, exc_value, exc_traceback = sys.exc_info()
    traceback_details = {
                         'filename': exc_traceback.tb_frame.f_code.co_filename,
                         'lineno'  : exc_traceback.tb_lineno,
                         'name'    : exc_traceback.tb_frame.f_code.co_name,
                         'type'    : exc_type.__name__,
                         'message' : traceback._some_str(exc_value)
                        }
    return traceback_details

