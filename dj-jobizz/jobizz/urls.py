from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

# Define the home view function FIRST
def home(request):
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Jobiza Home</title>
        <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            h1 { color: #2c3e50; }
            p { color: #7f8c8d; }
        </style>
    </head>
    <body>
        <h1>Welcome to Jobiza! 🚀</h1>
        <p>From Django</p>
    </body>
    </html>
    """
    return HttpResponse(html_content)

urlpatterns = [
    # Pass the function reference without ()
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/', include('jobs.urls')),
    path('api/', include('applications.urls')),
    path('api/cv/', include('cv_analyzer.urls')),
    path('api/companies/', include('companies.urls')),
]