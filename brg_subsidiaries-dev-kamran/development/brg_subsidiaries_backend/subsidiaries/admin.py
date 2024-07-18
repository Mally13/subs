from django.contrib import admin
from django.utils import timezone
from django.utils.html import format_html
from django.forms import forms
from django.conf import settings
from django.core.files import File
import json, os

from .models import DeletionRequest, Subsidiary, PendingSubsidiaryChange

@admin.register(DeletionRequest)
class DeletionRequestAdmin(admin.ModelAdmin):
    list_display = ('subsidiary', 'user', 'requested_at', 'approved', 'approved_at', 'deleted')
    actions = ['approve_and_delete_sub']

    def approve_and_delete_sub(self, request, queryset):
        for deletion_request in queryset:
            if not deletion_request.approved:
                deletion_request.approve_and_delete_sub()
                self.message_user(request, f'The deletion request for {deletion_request.subsidiary.name} has been approved and the subsidiary has been deleted.')
            else:
                self.message_user(request, f'The deletion request for {deletion_request.subsidiary.name} has already been approved and processed.')

    approve_and_delete_sub.short_description = 'Approve and Delete Subsidiary'


class SubsidiaryAdmin(admin.ModelAdmin):
    list_display = ('user', 'is_approved', 'name', 'category', 'website')
    list_filter = ('is_approved', 'user')
    actions = ['approve_subsidiaries']

    def approve_subsidiaries(self, request, queryset):
        queryset.update(is_approved=True)
        self.message_user(request, "Selected subsidiaries have been approved.")
    approve_subsidiaries.short_description = "Approve selected subsidiaries"

admin.site.register(Subsidiary, SubsidiaryAdmin)

@admin.register(PendingSubsidiaryChange)
class PendingSubsidiaryChangeAdmin(admin.ModelAdmin):
    def format_changes(self, changes):
        """
        Formats the dictionary of changes into a readable string.
        Example output: "Field: Old Value -> New Value"
        """
        formatted_changes = []
        for field, value in changes.items():
            if isinstance(value, dict) and 'old' in value and 'new' in value:
                formatted_changes.append(f"{field}: {value['old']} -> {value['new']}")
            else:
                formatted_changes.append(f"{field}: {value}")
        return "\n".join(formatted_changes)
    
    list_display = ('subsidiary', 'requested_by', 'requested_at', 'approved')
    actions = ['approve_changes']

    def approve_changes(self, request, queryset):
        for change in queryset:
            if not change.approved:
                change.approved = True
                change.approved_at = timezone.now()
                change.save()
                # Update the Subsidiary instance with the approved changes
                subsidiary = change.subsidiary
                changes = json.loads(change.changes)
                formatted_changes = self.format_changes(changes)  # New method to format changes
                for field, value in changes.items():
                    if isinstance(value, dict) and 'new' in value:
                        setattr(subsidiary, field, value['new'])
                    elif hasattr(subsidiary, field):
                        setattr(subsidiary, field, value)
                subsidiary.save()
                self.message_user(request, f'Changes to {subsidiary.name} have been approved. Changes: \n{formatted_changes}')
    
    approve_changes.short_description = 'Approve selected changes'

    def changes_formatted(self, obj):
        changes = json.loads(obj.changes)
        return format_html('<pre>{}</pre>', self.format_changes(changes))
    
    changes_formatted.short_description = 'Changes'
    readonly_fields = ('changes_formatted',)

    # Add 'changes_formatted' to the fields displayed in the detail view
    fieldsets = (
        (None, {
            'fields': ('subsidiary', 'requested_by', 'approved', 'changes_formatted')
        }),
    )
