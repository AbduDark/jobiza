from django.urls import re_path
from .views import AddEmployerView, CompanyCreateView, CompanyListView

urlpatterns = [
    re_path(r'^/?$', CompanyListView.as_view(), name='list-companies'),
    re_path(r'^add/?$', CompanyCreateView.as_view(), name='add-company'),
    re_path(r'^add-employer/?$', AddEmployerView.as_view(), name='add-employer'),
]