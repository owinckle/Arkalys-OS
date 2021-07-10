# Generated by Django 3.1.7 on 2021-07-10 04:58

import Invoicing.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='InvoiceItme',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('quantity', models.IntegerField(default=1)),
                ('price', models.DecimalField(decimal_places=2, max_digits=6)),
                ('notes', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('uuid', models.TextField(default=Invoicing.models.uniqueID, editable=False, max_length=5, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('client', models.CharField(max_length=200)),
                ('client_email', models.EmailField(max_length=254)),
                ('issued', models.DateField()),
                ('due', models.DateField()),
                ('currency', models.CharField(choices=[('EUR', 'EUR'), ('USD', 'USD')], default='EUR', max_length=5)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
