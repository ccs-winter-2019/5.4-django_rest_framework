from django.shortcuts import render
from django.views.generic import TemplateView, View
from django.http import HttpResponse

from rest_framework import viewsets

from .models import Candy
from .serializer import CandySerializer


class IndexView(TemplateView):
    template_name = 'index.html'


# An alternative is to use Django Rest Framework.
# DRF lets us use a ModelViewSet that can respond to requests for json
# and send back valid responses. It will set the content type and
# generate valid json without us sweating the details.
class DataView(viewsets.ModelViewSet):
    # We have to tell the view what data (queryset) we want to use
    # just like in our basic example
    queryset = Candy.objects.all()

    # We have to tell the view what model fields we want, so
    # we do that with a serializer class.
    serializer_class = CandySerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



# # This is a way to create a view that can send back a json response
# # This method has some problems though
# class DataView(View):
#     def get(self, *args, **kwargs):
#         queryset = Candy.objects.all()
#
#         # We need to manually loop the queryset and serialize each
#         # model into a string that's valid json.
#         objects = []
#         for candy in queryset:
#             objects.append('{"name": "' + candy.name + '"}')
#
#         # Then we need to craft a valid array or objects
#         response = '[{}]'.format(','.join(objects))
#
#         # And we need to remember to set the content type header...
#         return HttpResponse(response, content_type='application/json')
