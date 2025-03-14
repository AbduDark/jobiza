from django.contrib import admin
from django.urls import path , include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/', include('jobs.urls')),
    path('api/', include('applications.urls')),
    path('api/cv/', include('cv_analyzer.urls')),
    path('api/companies/', include('companies.urls')),
]