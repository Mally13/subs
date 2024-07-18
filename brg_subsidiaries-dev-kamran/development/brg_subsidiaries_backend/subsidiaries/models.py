from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()

class Subsidiary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    category = models.CharField(max_length=30, null=True, blank=True)
    logo = models.ImageField(upload_to='logos')
    address = models.CharField(max_length=50)
    website = models.CharField(max_length=50)
    contact_person = models.CharField(max_length=50)
    contact_email = models.CharField(max_length=50)
    mobile = models.CharField(max_length=20)
    work = models.CharField(max_length=20)
    no_of_employees = models.IntegerField(null=True, blank=True)
    annual_revenue = models.DecimalField(max_digits=9,decimal_places=2, null=True, blank=True)
    year_established = models.IntegerField()
    business_description = models.TextField()
    social_media_links = models.TextField()
    parent_company_relationship = models.CharField(max_length=50, null=True, blank=True)
    operational_status = models.CharField(max_length=20, null=True, blank=True)
    legal_entity_type = models.CharField(max_length=40)
    licensing_authority = models.CharField(max_length=40)
    market = models.CharField(max_length=40, null=True, blank=True)
    subsidiary_code = models.CharField(max_length=30)
    board_members = models.TextField(null=True, blank=True)
    operating_countries = models.TextField(null=True, blank=True)
    compliance_certifications = models.FileField(upload_to='certifications', null=True, blank=True)
    is_approved = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'Subsidiaries'

class DeletionRequest(models.Model):
    subsidiary = models.ForeignKey(Subsidiary, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    requested_at = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)
    approved_at = models.DateTimeField(null=True, blank=True)
    deleted = models.BooleanField(default=False)

    def approve_and_delete_sub(self):
        if not self.approved:
            self.approved = True
            self.approved_at = timezone.now()
            self.save()

            try:
                subsidiary = self.subsidiary
                subsidiary.delete()
                self.deleted = True
                self.save()
            except Subsidiary.DoesNotExist:
                pass

class PendingSubsidiaryChange(models.Model):
    subsidiary = models.ForeignKey(Subsidiary, on_delete=models.CASCADE)
    changes = models.JSONField()
    requested_by = models.ForeignKey(User, on_delete=models.CASCADE)
    requested_at = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)
    approved_at = models.DateTimeField(null=True, blank=True)
    processed = models.BooleanField(default=False)