# Generated by Django 3.1.7 on 2021-07-11 20:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Invoicing', '0007_invoice_notes'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='invoiceitem',
            name='notes',
        ),
    ]
