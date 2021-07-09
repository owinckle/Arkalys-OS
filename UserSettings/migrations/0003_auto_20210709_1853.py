# Generated by Django 3.1.7 on 2021-07-09 18:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('UserSettings', '0002_auto_20210709_1829'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pin',
            name='contacts',
            field=models.BooleanField(default=True),
        ),
        migrations.CreateModel(
            name='InstalledApp',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contacts', models.BooleanField(default=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
