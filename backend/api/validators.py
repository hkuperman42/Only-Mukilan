import re
from django.core import exceptions

def heightValidator(value):
    if not re.search(r"^\d'\s?(?:(?:[0-9]|1[0-2])\")?$", value):
        raise exceptions.ValidationError("Height values must be of the form x'y\"")