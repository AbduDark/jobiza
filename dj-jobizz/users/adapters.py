from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
import jwt
from jwt import PyJWKClient
from allauth.socialaccount.providers.oauth2.client import OAuth2Error

class CustomGoogleOAuth2Adapter(GoogleOAuth2Adapter):
    def _decode_id_token(self, app, id_token, verify_signature=True):
        """
        Decode the id_token returned by Google while allowing a leeway for clock skew.
        """
        try:
            # Google publishes its public keys at this endpoint
            jwks_url = "https://www.googleapis.com/oauth2/v3/certs"
            jwks_client = PyJWKClient(jwks_url)
            signing_key = jwks_client.get_signing_key_from_jwt(id_token)
            # Decode the token with a leeway of 60 seconds to allow for clock skew.
            decoded = jwt.decode(
                id_token,
                signing_key.key,
                algorithms=["RS256"],
                audience=app.client_id,
                leeway=60,  # Allow 60 seconds leeway
                options={"verify_exp": True}
            )
            return decoded
        except Exception as e:
            raise OAuth2Error("Invalid id_token: " + str(e)) from e
        
