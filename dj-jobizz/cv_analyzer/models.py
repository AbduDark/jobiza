from django.db import models
from users.models import User

class CVAnalysis(models.Model):
    raw_text = models.TextField()
    candidate = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    skills = models.JSONField()
    experience = models.JSONField()
    education = models.JSONField()
    tfidf_score = models.FloatField()
    semantic_score = models.FloatField()
    final_score = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"CV Analysis ({self.candidate.username}) score: {self.final_score:.2f}"