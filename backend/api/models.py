from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.conf import settings

# Create your models here.
class Profile(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    age = models.IntegerField(default=18, validators=[
        MaxValueValidator(116),
        MinValueValidator(18),
    ])
    bio = models.TextField(max_length=250)
    # pfp = models.FileField
    # WIP

