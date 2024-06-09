from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hornbill.settings')

celery_app = Celery('hornbill')
celery_app.conf.enable_utc = False
celery_app.conf.update(
    # task_serializer='pickle',
    # accept_content=['pickle'],  # Ignore other content
    # result_serializer='pickle',
    timezone='Asia/Kolkata'
    )
celery_app.config_from_object(settings, namespace='CELERY')
celery_app.autodiscover_tasks()

celery_app.conf.beat_schedule={

}

@celery_app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')