# Generated by Django 3.1.7 on 2021-07-10 17:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Invoicing', '0005_auto_20210710_1711'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='due',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='invoice',
            name='issued',
            field=models.DateField(blank=True, null=True),
        ),
    ]
