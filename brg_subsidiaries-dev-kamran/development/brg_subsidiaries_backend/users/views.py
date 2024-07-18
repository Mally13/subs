from django.shortcuts import render, redirect 
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, user_passes_test

from .forms import CustomAuthenticationForm

def login_view(request):
    if request.method == 'POST':
        form = CustomAuthenticationForm(request, data=request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('username')
            print(f'email {email}')
            password = form.cleaned_data.get('password')
            print(f'password {password}')
            user = authenticate(email=email, password=password)
            if user is not None:
                print('authent')
                login(request, user)
                return redirect('list_subsidiaries')
    else:
        form = CustomAuthenticationForm()
    return render(request, 'auth/login.html', {'form': form})



def logout_view(request):
    logout(request)
    return redirect('login')