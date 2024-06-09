from celery import shared_task
from django.conf import settings
from django.core.mail import EmailMessage, send_mail
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.contrib.auth import get_user_model
from orders.models import Order, OrderProduct
from django.template import Context
from django.template.loader import get_template
from django.template import Template, Context, loader


@shared_task(bind=True)
def sendRgisterMail(self, **kwargs):
    try:
        order = Order.objects.get(order_number=kwargs['order_id'], is_ordered = True)
        order_product = OrderProduct.objects.filter(order_id = order.id)
        mail_subject = "Thank you for your order"        
        context =  {
            'user':kwargs['user_name'],
            'order': order,
            'order_product':order_product,
            }

        
        template = loader.get_template("frontend_tmps/emails/order_received_email.html")
        
        message = render_to_string("frontend_tmps/emails/order_received_email.html",context)        

        mail_from = settings.EMAIL_HOST_USER
        to_mail = kwargs['email']
        send_email = EmailMessage(mail_subject, message, mail_from, to=[to_mail])
        
        send_email.attach_file(f"{settings.MEDIA_ROOT}/invoices/invoice-{order.order_number}.pdf")
        send_email.content_subtype = "html"
        send_email.send()

        # support = EmailMessage(mail_subject, message, mail_from, to=settings.ORDER_RECEIVER)
        # support.content_subtype = "html"
        # support.send()
        
        return {"status":True}
    except Exception as e:
      return {"status":False, "errors":f"{e}"}
   