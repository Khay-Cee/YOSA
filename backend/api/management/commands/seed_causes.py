from django.core.management.base import BaseCommand
from api.models import Cause


CAUSES = [
    {
        "name": "Donate For Treatment And Medicine",
        "category": "Medical",
        "description": "Funds go towards surgeries, treatments, and doctor visits. Provides life-saving medications and essential drugs for those who cannot afford healthcare.",
        "goal": 10000,
        "raised": 3000,
    },
    {
        "name": "Children We Work With",
        "category": "Homeless",
        "description": "Provides secure and comfortable housing for children in need. Many children lack a safe place to live and we work to change that every day.",
        "goal": 10000,
        "raised": 8500,
    },
    {
        "name": "Help For Education",
        "category": "Education",
        "description": "Help us provide educational opportunities to homeless children. Many children without homes miss out on the chance to go to school and build a future.",
        "goal": 10000,
        "raised": 9000,
    },
    {
        "name": "Help For Food",
        "category": "Food",
        "description": "Help us provide nutritious meals to homeless children. Many children go hungry every day, lacking access to food for healthy growth and development.",
        "goal": 2000,
        "raised": 1500,
    },
]


class Command(BaseCommand):
    help = "Seed the database with the 4 default causes"

    def handle(self, *args, **options):
        created = 0
        for data in CAUSES:
            cause, was_created = Cause.objects.get_or_create(
                name=data["name"],
                defaults={
                    "category": data["category"],
                    "description": data["description"],
                    "goal": data["goal"],
                    "raised": data["raised"],
                    "is_active": True,
                },
            )
            if was_created:
                created += 1
                self.stdout.write(self.style.SUCCESS(f"  Created: {cause.name}"))
            else:
                self.stdout.write(f"  Already exists: {cause.name}")

        self.stdout.write(self.style.SUCCESS(f"\nDone — {created} cause(s) created."))
