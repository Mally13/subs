from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied

from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
from django.db import models
import json

from .models import Subsidiary, PendingSubsidiaryChange, DeletionRequest

User = get_user_model()

def serialize_validated_data(validated_data, instance):
    """Helper function to serialize validated data, converting file fields to their URLs if they exist."""
    data = {}
    for key, value in validated_data.items():
        if isinstance(instance._meta.get_field(key), models.FileField):
            if isinstance(value, models.fields.files.FieldFile):
                data[key] = value.url if value else None
            else:
                data[key] = value.name if value else None
        else:
            data[key] = value
    return data

class SubsidiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subsidiary
        fields = '__all__'
        extra_kwargs = {
            'user': {'required': False},
            'is_approved': {'required': False}
        }

    def create(self, validated_data):
        user = self.context['request'].user  # Get current user from serializer context
        validated_data['user'] = user  # Associate subsidiary with current user
        print(f'got here {user}')
        validated_data['is_approved'] = False  # Mark subsidiary as not approved

        # Create subsidiary instance
        subsidiary = super().create(validated_data)

        # Notify admin via email
        admin_emails = User.objects.filter(is_superuser=True).values_list('email', flat=True)
        subject = 'New Subsidiary Approval Required'
        message = f'A new subsidiary "{subsidiary.name}" has been created by {user}. Please review and approve it.\n\n'
        message += f'View details: http://localhost:8000/admin/subsidiaries/subsidiary/{subsidiary.id}/'
        email_from = settings.DEFAULT_FROM_EMAIL

        try:
            send_mail(subject, message, email_from, admin_emails, fail_silently=False)
        except Exception as e:
            # Handle email sending failure here (optional)
            pass

        return subsidiary
    
    def update(self, instance, validated_data):
        user = self.context['request'].user

        # Check if the user is associated with the subsidiary
        if user != instance.user:
            raise PermissionDenied("You do not have permission to update this subsidiary.")

        # Serialize the validated data
        changes = serialize_validated_data(validated_data, instance)

        # If changes exist, create a PendingSubsidiaryChange record
        if changes:
            change_data = {
                'subsidiary': instance,
                'changes': json.dumps(changes),
                'requested_by': user,
            }
            PendingSubsidiaryChange.objects.create(**change_data)

        return super().update(instance, validated_data)
        
    

class DeletionRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeletionRequest
        fields = '__all__'
