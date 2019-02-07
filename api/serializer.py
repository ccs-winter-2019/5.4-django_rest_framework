
from rest_framework.serializers import ModelSerializer

from .models import Candy


# This class is responsible for properly formatting our model as json
# We need to tell it the model to use, and which fields we want included in the json.
class CandySerializer(ModelSerializer):
    class Meta:
        model = Candy
        fields = ['name', 'is_chocolate', ]