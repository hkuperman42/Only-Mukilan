from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.conf import settings
from . import validators
from . import utils

# Create your models here.
class Profile(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    age = models.IntegerField(default=18, validators=[
        MaxValueValidator(116),
        MinValueValidator(18),
    ])
    height = models.CharField(max_length=10, default=r"5'9\"", validators=[validators.heightValidator])
    bio = models.TextField(max_length=250)
    pfp = models.ImageField(upload_to=utils.user_path, null=True, blank=True)



