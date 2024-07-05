from django.db import models

class Pizza(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=8, decimal_places=2, default=8000)
    imagen = models.ImageField(upload_to='pizzas/')

    def __str__(self):
      return self.nombre