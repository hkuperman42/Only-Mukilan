from django.test import TestCase
from . import validators
from django.core import exceptions

# Create your tests here.
class HeightValidatorTest(TestCase):
    def setUp(self):
        self.testCases = [
            ("5'9\"", True),
            ("w5'9\"", False),
            ("5' 9\"", True),
            ("6'", True),
            ("6' ", True),
            ("Hampter", False),
            ("6", False),
            ("6 5", False),
        ]
    
    def test_regex(self):
        for t_case in self.testCases:
            if t_case[1] == False:
                with self.assertRaises(exceptions.ValidationError):
                    validators.heightValidator(t_case[0])
            else:
                validators.heightValidator(t_case[0])