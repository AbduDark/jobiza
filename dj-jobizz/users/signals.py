from allauth.account.signals import user_signed_up
from django.dispatch import receiver
from .models import CandidateProfile, User

@receiver(user_signed_up)
def create_candidate_profile_on_signup(request, user, **kwargs):
    # If the user is created via social login and their default user_type is "candidate"
    if user.user_type == User.UserType.CANDIDATE:
        # Create a CandidateProfile if one does not exist
        if not hasattr(user, "candidate_profile"):
            full_name = f"{user.first_name} {user.last_name}".strip() or user.email
            CandidateProfile.objects.create(user=user, full_name=full_name)