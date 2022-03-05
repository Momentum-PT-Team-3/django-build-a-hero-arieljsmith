from django.db import models


class Hero(models.Model):
    name = models.CharField(max_length=60)
    alias = models.CharField(max_length=60)
    portrait = models.ImageField(upload_to='hero_portraits/', default='hero_portraits/placeholderPortrait.jpg', height_field=None, width_field=None, max_length=100)
    #Feel free to add more! image, type of superhero, etc.

    def __str__(self):
        return self.name
