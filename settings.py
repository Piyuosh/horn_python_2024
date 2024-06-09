"""
Django settings for horn_pro project.

Generated by 'django-admin startproject' using Django 4.2.7.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
from decouple import config

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-ko*3y404_34tnu12ez$a36@%($=jeurg5py!v2$suv&m&lkxde'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_filters',
    'rest_framework',
    'django_celery_results',
    'django_celery_beat',
    'advanced_filters',
    'decouple',
    'frontend',
    'accounts',
    'store',
    'cart',
    'orders',
    'seller',
    'variation',    
    'constant',
    'addons',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django_session_timeout.middleware.SessionTimeoutMiddleware',
]

ROOT_URLCONF = 'horn_pro.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / "templates"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'frontend.context_processers.left_menu_bar',
                'cart.context_processers.counter',
                'cart.context_processers.cart_items',
            ],
            'libraries':{
                'custom_tags': 'templatetags.custom_tags',            
            },
        },
    },
]

WSGI_APPLICATION = 'horn_pro.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'dev2_dUzGylxsxQX7KUm',
        'USER': 'n486S4cXId_qAYd',
        'PASSWORD': 'Tp&K$066Tj878F',
        'HOST': '127.0.0.1',
        'PORT': '3306'
        }    
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


SESSION_EXPIRE_SECONDS = 3600  # 1 hour
SESSION_EXPIRE_AFTER_LAST_ACTIVITY = True
SESSION_TIMEOUT_REDIRECT = '/account/login'
DATA_UPLOAD_MAX_MEMORY_SIZE=5242880


# Manually added
STATIC_ROOT = BASE_DIR / "static/"
STATICFILES_DIRS = [
     "hornbill/static"
    #'/var/www/static/',
]
# Add Media Cobfigration
MEDIA_ROOT = BASE_DIR / "media"
MEDIA_URL = '/media/'

#Add Custom Users
AUTH_USER_MODEL = 'accounts.Account'

# Alert Messageing  configration
from django.contrib.messages import constants as messages
MESSAGE_TAGS = {
    messages.DEBUG: 'bg-light',
    messages.INFO: 'alert-info border-info',
    messages.SUCCESS: 'alert-success border-success',
    messages.WARNING: 'alert-warning border-warning',
    messages.ERROR: 'alert-danger border-danger',
}

#Email configuration

EMAIL_BACKEND = config('EMAIL_BACKEND')
EMAIL_HOST = config('EMAIL_HOST')
EMAIL_USE_TLS = config('EMAIL_USE_TLS', cast=bool)
EMAIL_PORT = config('EMAIL_PORT', cast=int)
EMAIL_HOST_USER = config('EMAIL_HOST_USER') #sender's email-id
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD') #password associated with above email-id
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL')

# MSG91 configuration

MSG91_AUTH_KEY = config('MSG91_AUTH_KEY')
MSG91_SENDER_ID = config('MSG91_SENDER_ID')
MSG91_API_DOMAIN = config('MSG91_API_DOMAIN')
MSG91_API_ENDPOINT = config('MSG91_API_ENDPOINT')

RECAPTCHA_PUBLIC_KEY = config('RECAPTCHA_PUBLIC_KEY')
RECAPTCHA_PRIVATE_KEY = config('RECAPTCHA_PRIVATE_KEY')
# RECAPTCHA_PROXY = config('RECAPTCHA_PROXY', cast=dict)


MERCHANT_KEY = config('MERCHANT_KEY')
KEY=config('KEY')
SALT = config('SALT')
PAYMENT_URL_TEST = config('PAYMENT_URL_TEST')
PAYMENT_URL_LIVE = config('PAYMENT_URL_LIVE')

PAID_FEE_AMOUNT = config('PAID_FEE_AMOUNT')
PAID_FEE_PRODUCT_INFO = config('PAID_FEE_PRODUCT_INFO')
SERVICE_PROVIDER = config('SERVICE_PROVIDER')

CELERY_BROKER_URL = config('CELERY_BROKER_URL')
# CELERY_ACCEPT_CONTENT = config('CELERY_ACCEPT_CONTENT')
# CELERY_RESULT_SERIALIZER = config('CELERY_RESULT_SERIALIZER')
# CELERY_TASK_SERIALIZER = config('CELERY_TASK_SERIALIZER')
# CELERY_TIMEZONE = config('CELERY_TIMEZONE')
CELERY_RESULT_BACKEND = config('CELERY_RESULT_BACKEND')

#CELERY BEAT SETTINGS

CELERY_BEAT_SCHEDULER  = config('CELERY_BEAT_SCHEDULER')

RAZORPAY_KEY_ID = config('RAZORPAY_KEY_ID')
RAZORPAY_KEY_SECRET = config('RAZORPAY_KEY_SECRET')

GST_RATE=3

ORDER_RECEIVER=['sainipiyosh367@gmail.com','ajits@gmail.com']
