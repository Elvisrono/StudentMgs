from django.urls import path

from students import views
from students.views import StudentList, StudentDetailed

urlpatterns = [
    path('students/', StudentList.as_view(), name='student-list'),
    path('students/<int:id>/', StudentDetailed.as_view(), name='student-details'),
]