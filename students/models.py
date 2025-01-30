from django.db import models

# Create your models here.
class Student(models.Model):
    FirstName = models.CharField(max_length=50)
    LastName = models.CharField(max_length=50)
    RegistrationNo = models.CharField(max_length=50, unique=True)
    Email = models.EmailField(unique=True)
    Course = models.CharField(max_length=50)


    def __str__(self):
        return f"{self.FirstName} {self.LastName}"
