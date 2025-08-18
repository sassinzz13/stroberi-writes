from django.contrib.sitemaps import Sitemap
from .models import Post

# change frequency of your post pages and their relevance in your website 
class PostSitemap(Sitemap):
    changefreq = 'weekly'
    priority = 0.9

    def items(self):
        return Post.published.all()

    def lastmod(self, obj):
        return obj.updated