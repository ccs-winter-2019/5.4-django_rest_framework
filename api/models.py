from django.db import models


class Candy(models.Model):
    name = models.CharField(max_length=255)
    is_chocolate = models.BooleanField(default=True)

    def __str__(self):
        return self.name
