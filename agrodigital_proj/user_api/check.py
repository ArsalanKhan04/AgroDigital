from django.contrib.auth import get_user_model
User = get_user_model()

# Example user data

user_data = {
    'email': 'farmer@example.com',
    'password': 'password123'
}

# Create a user object
user = User.objects.create_user(**user_data)
