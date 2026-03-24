from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='marvel', description='Marvel superheroes')
        dc = Team.objects.create(name='dc', description='DC superheroes')

        # Users
        users = [
            User(email='ironman@marvel.com', name='Iron Man', team='marvel', is_superhero=True),
            User(email='captainamerica@marvel.com', name='Captain America', team='marvel', is_superhero=True),
            User(email='batman@dc.com', name='Batman', team='dc', is_superhero=True),
            User(email='wonderwoman@dc.com', name='Wonder Woman', team='dc', is_superhero=True),
        ]
        User.objects.bulk_create(users)

        # Activities
        activities = [
            Activity(user='ironman@marvel.com', activity_type='run', duration=30, date='2023-01-01'),
            Activity(user='captainamerica@marvel.com', activity_type='cycle', duration=45, date='2023-01-02'),
            Activity(user='batman@dc.com', activity_type='swim', duration=60, date='2023-01-03'),
            Activity(user='wonderwoman@dc.com', activity_type='yoga', duration=50, date='2023-01-04'),
        ]
        Activity.objects.bulk_create(activities)

        # Workouts
        workouts = [
            Workout(name='Pushups', description='Do pushups', difficulty='easy'),
            Workout(name='Squats', description='Do squats', difficulty='medium'),
            Workout(name='Plank', description='Hold plank', difficulty='hard'),
        ]
        Workout.objects.bulk_create(workouts)

        # Leaderboard
        Leaderboard.objects.create(team='marvel', points=150)
        Leaderboard.objects.create(team='dc', points=120)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
