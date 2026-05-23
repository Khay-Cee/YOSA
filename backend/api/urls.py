from django.urls import path
from rest_framework import routers
from .views import *
from .api import *
from . import views

router = routers.DefaultRouter()
router.register('api/volunteers', VolunteerViewSet, 'Volunteer')
router.register('api/contactus', ContactUsViewSet, 'ContactUs')
router.register('api/donations', DonationViewset, 'Donation')
router.register('api/newsletter', NewsletterViewSet, 'Newsletter')
router.register('api/causes', CauseViewSet, 'Cause')

urlpatterns = [
    path('verify-payment/', VerifyPaymentView.as_view(), name='verify_payment'),
    path('api/news/', NewsList.as_view(), name='news_list'),
    path('api/gallery/', GalleryList.as_view(), name='gallery'),
] + router.urls
