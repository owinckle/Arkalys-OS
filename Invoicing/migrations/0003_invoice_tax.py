# Generated by Django 3.1.7 on 2021-07-10 05:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Invoicing', '0002_auto_20210710_0459'),
    ]

    operations = [
        migrations.AddField(
            model_name='invoice',
            name='tax',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=6),
        ),
    ]
