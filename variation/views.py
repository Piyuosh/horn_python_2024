from django.shortcuts import render, get_list_or_404
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from.models import AttributeValue
import json

# Create your views here.
def variations(request):
    return render(request, 'frontend_tmps/about.html')

def variant_value(request):
    body = json.loads(request.body)
    data = {item.id: item.name for item in AttributeValue.objects.filter(attribute=body['attribute_id'])}
    # data = AttributeValue.objects.filter(attribute=body['attribute_id'])
    # return HttpResponse(serializers.serialize('json', data))
    return JsonResponse(data)