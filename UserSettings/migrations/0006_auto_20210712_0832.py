# Generated by Django 3.1.7 on 2021-07-12 08:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserSettings', '0005_auto_20210710_0430'),
    ]

    operations = [
        migrations.AddField(
            model_name='installedapp',
            name='calendar',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='pin',
            name='calendar',
            field=models.BooleanField(default=False),
        ),
    ]