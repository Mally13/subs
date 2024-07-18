from django.urls import path
from . import views

urlpatterns = [
    path('subsidiary/add/', views.add_subsidiary, name='add_subsidiary'),
    path('subsidiary/edit/<int:id>/', views.edit_subsidiary, name='edit_subsidiary'),
    path('', views.list_subsidiaries, name='list_subsidiaries'),
    path('request-delete-subsidiary/<int:id>/', views.request_delete_subsidiary, name='request_delete_subsidiary'),
    path('detail-subsidiary/<int:id>/', views.subsidiary_detail_view, name='subsidiary_detail'),
]
