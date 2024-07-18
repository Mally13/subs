from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views_api import SubsidiaryViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'subsidiaries', SubsidiaryViewSet, basename='subsidiaries')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Other paths
]