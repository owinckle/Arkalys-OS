# Generated by Django 3.1.7 on 2021-07-09 15:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Contacts', '0003_auto_20210709_1435'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='contact',
            name='pinned',
        ),
    ]
