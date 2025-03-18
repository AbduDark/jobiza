from django.contrib import admin
from .models import User, CandidateProfile, CompanyHeadProfile

admin.site.register(User)
admin.site.register(CandidateProfile)
admin.site.register(CompanyHeadProfile)

