import logging
from django.db.models import F
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from paystackapi.transaction import Transaction
from .serializers import *
from rest_framework import generics
from . import models

logger = logging.getLogger(__name__)


class VerifyPaymentView(APIView):
    def get(self, request, *args, **kwargs):
        reference = request.query_params.get('reference')
        if not reference:
            return Response({'status': 'error', 'message': 'No reference provided'}, status=400)
        try:
            transaction = Transaction.verify(reference=reference)
        except Exception as e:
            logger.error(f"Paystack verify error for ref {reference}: {e}")
            return Response({'status': 'error', 'message': str(e)}, status=500)

        if transaction.get('status') and transaction['data']['status'] == 'success':
            try:
                donation = Donation.objects.get(reference=reference)
                if not donation.verified:
                    donation.verified = True
                    donation.save()
                    logger.info(f"Donation {reference} marked verified, amount={donation.amount}")
                    if donation.cause and donation.amount > 0:
                        Cause.objects.filter(pk=donation.cause.pk).update(
                            raised=F('raised') + donation.amount
                        )
                        logger.info(f"Cause '{donation.cause.name}' raised updated +{donation.amount}")
            except Donation.DoesNotExist:
                logger.warning(f"No donation found for reference {reference}")
            return Response({'status': 'success', 'data': transaction}, status=200)

        return Response({'status': 'failed', 'data': transaction}, status=400)


class ContactList(generics.ListAPIView):
    queryset = models.ContactUs.objects.all()
    serializer_class = ContactUsSerializer

class NewsList(generics.ListAPIView):
    queryset = models.News.objects.filter(status='p').order_by('-date')
    serializer_class = NewsSerializer

class GalleryList(generics.ListAPIView):
    queryset = models.Gallery.objects.all()
    serializer_class = GallerySerializer
    
class ContactList(generics.ListAPIView):
    queryset = models.ContactUs.objects.all()
    serializer_class = ContactUsSerializer
    
class NewsList(generics.ListAPIView):
    queryset = models.News.objects.filter(status='p').order_by('-date')
    serializer_class = NewsSerializer
    
class GalleryList(generics.ListAPIView):
    queryset = models.Gallery.objects.all()
    serializer_class = GallerySerializer
    