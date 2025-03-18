from django.db import models
from jobs.models import Job
from users.models import CandidateProfile

class Application(models.Model):
    STATUS_CHOICES = [
        ('delivered', 'Delivered'),
        ('reviewed', 'Reviewed'),
        ('interviewed', 'Interviewed'),
        ('rejected', 'Rejected'),
        ('hired', 'Hired'),
        ('cancelled', 'Cancelled')
    ]

    cv = models.FileField(upload_to='resumes/', null=True, blank=True)
    candidate = models.ForeignKey(CandidateProfile, on_delete=models.CASCADE, related_name='applications')
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    cover_letter = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='delivered')
    applied_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('candidate', 'job')

    def __str__(self):
        return f"{self.candidate.user.email} - {self.job.title}"



class ApplicationDocument(models.Model):
    application = models.ForeignKey(
        Application,
        on_delete=models.CASCADE,
        related_name='documents'
    )
    file = models.FileField(upload_to='application_docs/')
    name = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)