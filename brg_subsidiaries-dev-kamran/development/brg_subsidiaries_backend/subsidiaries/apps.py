from django.apps import AppConfig


class SubsidiariesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'subsidiaries'

    def ready(self):
        import subsidiaries.signals 
