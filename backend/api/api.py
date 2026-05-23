import logging
import uuid

from api.models import *
from .serializers import *
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from django.db import IntegrityError

logger = logging.getLogger(__name__)

#News Viewset
class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = NewsSerializer

#Contact Us Viewset
class ContactUsViewSet(viewsets.ModelViewSet):
    queryset = ContactUs.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ContactUsSerializer

    def create(self, request, *args, **kwargs):
        logger.info(f"ContactUs POST from {request.data.get('email')}")
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                self.perform_create(serializer)
                headers = self.get_success_headers(serializer.data)
                logger.info("ContactUs message saved successfully")
                return Response({
                    "success": True,
                    "message": "Thank you for contacting us. We'll get back to you shortly."
                }, status=status.HTTP_201_CREATED, headers=headers)
            except IntegrityError:
                logger.warning(f"ContactUs duplicate email: {request.data.get('email')}")
                return Response({
                    "success": False,
                    "message": "Email already in use."
                }, status=status.HTTP_400_BAD_REQUEST)
        logger.warning(f"ContactUs validation errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Donation Viewset
class DonationViewset(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = DonationSerializer

    def create(self, request, *args, **kwargs):
        logger.info(f"Donation POST: type={request.data.get('donation_type')}, email={request.data.get('email_address')}")
        data = request.data.copy()
        # ensure reference is always unique
        ref = data.get('reference', '')
        if not ref or ref == 'YOSA':
            data['reference'] = f"yosa_{uuid.uuid4().hex[:16]}"
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            try:
                self.perform_create(serializer)
                logger.info(f"Donation created: id={serializer.data.get('id')}, ref={serializer.data.get('reference')}")
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except IntegrityError:
                logger.error("Donation IntegrityError — duplicate reference")
                return Response({"detail": "Duplicate reference. Please try again."}, status=status.HTTP_400_BAD_REQUEST)
        logger.warning(f"Donation validation errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Newsletter Viewset
class NewsletterViewSet(viewsets.ModelViewSet):
    queryset = Newsletter.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = NewsletterSerializer

    def create(self, request, *args, **kwargs):
        logger.info(f"Newsletter subscription: {request.data.get('email')}")
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                self.perform_create(serializer)
                logger.info(f"Newsletter subscribed: {request.data.get('email')}")
                return Response({"success": True, "message": "You're subscribed! Thank you."}, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response({"success": False, "message": "This email is already subscribed."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#Cause Viewset (read-only from API)
class CauseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Cause.objects.filter(is_active=True)
    permission_classes = [permissions.AllowAny]
    serializer_class = CauseSerializer


#Volunteer Viewset
class VolunteerViewSet(viewsets.ModelViewSet):
    queryset = Volunteer.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = VolunteerSerializer

    def create(self, request, *args, **kwargs):
        logger.info(f"Volunteer POST: email={request.data.get('email_address')}")
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                self.perform_create(serializer)
                headers = self.get_success_headers(serializer.data)
                logger.info(f"Volunteer registered: {request.data.get('email_address')}")
                return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
            except IntegrityError:
                logger.warning(f"Volunteer duplicate email: {request.data.get('email_address')}")
                return Response({"detail": "Email already in use."}, status=status.HTTP_400_BAD_REQUEST)
        logger.warning(f"Volunteer validation errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
