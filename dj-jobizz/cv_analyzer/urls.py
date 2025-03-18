from django.urls import path
from .views import CVAnalyzeView

urlpatterns = [
    path('analyze/', CVAnalyzeView.as_view(), name='cv-analyze'),
]
