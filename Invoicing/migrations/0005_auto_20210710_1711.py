# Generated by Django 3.1.7 on 2021-07-10 17:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Invoicing', '0004_invoice_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='invoice',
            name='client',
        ),
        migrations.RemoveField(
            model_name='invoice',
            name='title',
        ),
        migrations.AddField(
            model_name='invoice',
            name='client_city',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='invoice',
            name='client_country',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='invoice',
            name='client_name',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='invoice',
            name='client_street',
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AddField(
            model_name='invoice',
            name='client_zip',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AddField(
            model_name='invoice',
            name='description',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='invoice',
            name='org_city',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='invoice',
            name='org_country',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='invoice',
            name='org_street',
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AddField(
            model_name='invoice',
            name='org_zip',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AlterField(
            model_name='invoice',
            name='client_email',
            field=models.EmailField(blank=True, max_length=254),
        ),
        migrations.AlterField(
            model_name='invoice',
            name='due',
            field=models.DateField(blank=True),
        ),
        migrations.AlterField(
            model_name='invoice',
            name='issued',
            field=models.DateField(blank=True),
        ),
    ]
