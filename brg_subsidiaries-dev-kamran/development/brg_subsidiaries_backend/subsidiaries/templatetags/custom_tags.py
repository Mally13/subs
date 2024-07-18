from django import template

register = template.Library()

@register.filter
def is_required(field):
    return field.field.required 

@register.filter
def has_pending_delete(subsidiary, pending_deletions):
    return any(pending_delete.subsidiary == subsidiary for pending_delete in pending_deletions)

@register.filter
def has_pending_edit(subsidiary, pending_edits):
    return any(pending_edit.subsidiary == subsidiary for pending_edit in pending_edits)