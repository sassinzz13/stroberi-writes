from django.db import models
from django.utils import timezone
from django.conf import settings
from django.urls import reverse
from taggit.managers import TaggableManager
from cloudinary.models import CloudinaryField
from django.contrib.auth.models import User
# Create your models here.

#publish manager that allows us to retrieve posts using the notation Post.objects.my_manager(), the latter provides you with a QuerySet notation like Post.my_manager.all().
class PublishedManager(models.Manager):
    def get_queryset(self):
        return (
            super().get_queryset().filter(status=Post.Status.PUBLISHED)
        )

class Post(models.Model):

    # The status of our blog post
    class Status(models.TextChoices):
        DRAFT = 'DF', 'Draft'
        PUBLISHED = 'PB', 'Published'
    
    # Our query models
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250, unique_for_date='publish') # so it cannot repeat
    # author model
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='blog_posts'
    )
    image = CloudinaryField('image', blank=True, null=True) # cloudinary cdn
    body = models.TextField()
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True) # uses auto_now, the date will be updated automatically
    # the status of our blog, it has a maxed length of 2
    # the choices are either DRAFT OR PUBLISHED cause its link to Status
    # the default status is DRAFT
    status = models.CharField(
        max_length=2,
        choices=Status,
        default=Status.DRAFT
    )
    objects = models.Manager() # The default manager.
    published = PublishedManager() # Our custom manager.
    tags = TaggableManager() # allow you to add, retrieve, and remove tags from Post objects.
    # metadata 
    class Meta:
        ordering = ['-publish'] # sets the order of the post to publish, returned in reverse using the hypen
        indexes = [
            models.Index(fields=['-publish']), # defines database indexes for our model, index is in descending order due to hypen
        ]
    # return a human readable string
    def __str__(self):
        return self.title
    
    # get a master copy of the url dynamically
    #  reverse() function will build the URL dynamically using the URL name defined in the URL patterns
    def get_absolute_url(self):
        return reverse(
            'blog:post_detail',
            args=[
                self.publish.year,
                self.publish.month,
                self.publish.day,
                self.slug
            ]
        )
    

# Comments model
class Comment(models.Model):
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments', null=True, blank=True)
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)
    

    class Meta:
        ordering = ['created']
        indexes = [
            models.Index(fields=['created']),
        ]
        
    def __str__(self):
        return f'Comment by {self.name} on {self.post}'