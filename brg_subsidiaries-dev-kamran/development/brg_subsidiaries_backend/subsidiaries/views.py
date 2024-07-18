from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django import forms
from django.contrib.auth import get_user_model
from django.conf import settings
from django.core.mail import send_mail
import json


from .models import Subsidiary, DeletionRequest,PendingSubsidiaryChange
from .forms import SubsidiaryForm


User = get_user_model()

@login_required
def add_subsidiary(request):
    if request.method == 'POST':
        form = SubsidiaryForm(request.POST, request.FILES)
        if form.is_valid():
            subsidiary = form.save(commit=False)
            subsidiary.user = request.user
            subsidiary.is_approved = False
            subsidiary.save()

            #notify the admin through email
            admin_emails = User.objects.filter(is_superuser=True).values_list('email', flat=True)
            subject = 'New Subsidiary Approval Required'
            message = f'A new subsidiary  with the details; \n name: {subsidiary.name}, address:{subsidiary.address}, website: {subsidiary.website}, contact_person: {subsidiary.contact_person}, contact_email: {subsidiary.contact_email}, mobile: {subsidiary.mobile}, work: {subsidiary.work}, year established: {subsidiary.year_established}, business_description: {subsidiary.business_description}, social media links: {subsidiary.social_media_links}, legal type entity: {subsidiary.legal_entity_type}, licensing_authority: {subsidiary.licensing_authority}, subsidiary_code: {subsidiary.subsidiary_code}'
            message += f'\nwith the link "http://localhost:8000/admin/subsidiaries/subsidiary/" has been created by {request.user}. Please review and approve it.'
            email_from = settings.DEFAULT_FROM_EMAIL
            
            try:
                send_mail(subject, message, email_from, admin_emails, fail_silently=False)
                messages.success(request, 'Subsidiary was successfully created!')
            except Exception as e:
                messages.error(request, f'Failed to send notification email: {str(e)}')



            return redirect('list_subsidiaries')  # Adjust the redirect as needed
        else:
            messages.error(request, 'Please correct the error below.')
    else:
        form = SubsidiaryForm()
    return render(request, 'subsidiaries/add_subsidiary.html', {'form': form})


@login_required
def list_subsidiaries(request):
    subsidiaries = Subsidiary.objects.filter(is_approved=True)
    for subsidiary in subsidiaries:
        print(f'subsidiary.user {subsidiary.user}')
    print(f'request.user {request.user}')
    pending_edits = PendingSubsidiaryChange.objects.all()
    pending_deletions = DeletionRequest.objects.all()
    return render(request, 'subsidiaries/list_subsidiaries.html', {'subsidiaries': subsidiaries,
                                                                   'pending_edits':pending_edits,
                                                                   'pending_deletions':pending_deletions})\

def subsidiary_detail_view(request, id):
    subsidiary = get_object_or_404(Subsidiary, pk=id)
    context = {
        'subsidiary': subsidiary,
    }
    return render(request, 'subsidiaries/detail_subsidiary.html', context)  
                                                                 

def serialize_form_data(form):
    """Helper function to serialize form data, converting file fields to their URLs."""
    data = {}
    for field in form.cleaned_data:
        value = form.cleaned_data[field]
        if isinstance(form.fields[field], forms.FileField):
            data[field] = value.url if value else None
        else:
            data[field] = value
    return data

@login_required
def edit_subsidiary(request, id):
    subsidiary = get_object_or_404(Subsidiary, id=id)
    if request.method == 'POST':
        form = SubsidiaryForm(request.POST, request.FILES, instance=subsidiary)
        if form.is_valid():
            # Serialize the form data
            changes = serialize_form_data(form)
            pending_change = PendingSubsidiaryChange(
                subsidiary=subsidiary,
                changes=json.dumps(changes),
                requested_by=request.user
            )
            pending_change.save()
            return redirect('list_subsidiaries')  # Redirect to a suitable page after requesting the change
        else:
            messages.error(request, 'Please correct the error below.')
    else:
        form = SubsidiaryForm(instance=subsidiary)
    return render(request, 'subsidiaries/edit_subsidiary.html', {'form': form, 'subsidiary': subsidiary})

@login_required
def request_delete_subsidiary(request, id):
    subsidiary = get_object_or_404(Subsidiary, id=id)
    if request.method == "POST":
        DeletionRequest.objects.create(user=request.user, subsidiary=subsidiary)
        messages.success(request, 'Your deletion request has been submitted and is pending approval.')
        return redirect('list_subsidiaries')
    return render(request, 'subsidiaries/request_delete_subsidiary.html', {'subsidiary': subsidiary})
    