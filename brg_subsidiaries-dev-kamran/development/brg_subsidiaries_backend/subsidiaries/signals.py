from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from django.db import models
import json

from .models import DeletionRequest, Subsidiary, PendingSubsidiaryChange

@receiver(post_save, sender=DeletionRequest)
def handle_deletion_request(sender, instance, created, **kwargs):
    if instance.approved and not instance.deleted:
        try:
            subsidiary = instance.subsidiary
            subsidiary.delete()
            instance.deleted = True  # Mark the deletion request as processed
            # instance.save()
        except Subsidiary.DoesNotExist:
            pass

@receiver(post_save, sender=PendingSubsidiaryChange)
def handle_approval(sender, instance, created, **kwargs):
    if instance.approved and not instance.processed:
        try:
            subsidiary = instance.subsidiary

            changes = json.loads(instance.changes)
            
            # Update the subsidiary with changes
            for key, value in changes.items():
                setattr(subsidiary, key, value)
            
            subsidiary.save()
            
            # Mark the change request as processed
            instance.processed = True
            instance.approved_at = timezone.now()
            instance.delete()
        except Subsidiary.DoesNotExist:
            pass
