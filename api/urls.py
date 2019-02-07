from django.urls import path

from . import views

app_name = 'api'

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    # path('data/', views.DataView.as_view(), name='data'),
    path('data/', views.DataView.as_view({
        'get': 'list',  # GET method should list objects
        'post': 'create',  # POST method should create object
    }), name='data'),
]
