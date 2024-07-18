from rest_framework import viewsets, permissions, status
from django.contrib.auth import get_user_model
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from .models import Subsidiary, DeletionRequest
from .serializers import SubsidiarySerializer, DeletionRequestSerializer

from .models import Subsidiary
from .serializers import SubsidiarySerializer

User = get_user_model()

class SubsidiaryViewSet(viewsets.ModelViewSet):
    queryset = Subsidiary.objects.all()
    serializer_class = SubsidiarySerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['delete'])
    def request_deletion(self, request, pk=None):
        subsidiary = self.get_object()
        user = request.user

        # Check if the user is associated with the subsidiary
        if user != subsidiary.user:
            raise PermissionDenied("You do not have permission to delete this subsidiary.")

        # Create a deletion request
        deletion_request = DeletionRequest.objects.create(
            subsidiary=subsidiary,
            user=user
        )

        # Serialize and return the deletion request
        serializer = DeletionRequestSerializer(deletion_request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)