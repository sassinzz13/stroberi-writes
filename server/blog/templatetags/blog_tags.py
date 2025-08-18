import markdown
from django.utils.safestring import mark_safe
from django import template
from ..models import Post
from django.db.models import Count

register = template.Library()

# simple template tag that returns the number of posts published on the blog.
@register.simple_tag
def total_posts():
    return Post.published.count()

# display the latest posts in the sidebar of the blog. 
@register.inclusion_tag('blog/post/latest_posts.html') #  the template that will be rendered with the returned values using blog/post/latest_posts.html. 
def show_latest_posts(count=5):
    latest_posts = Post.published.order_by('-publish')[:count]
    return {'latest_posts': latest_posts}

# display the most commented post 
@register.simple_tag
def get_most_commented_posts(count=5):
    #  aggregate the total number of comments for each post
    return Post.published.annotate( 
        total_comments = Count('comments')
    ).order_by('-total_comments')[:count]

# markkdown for filter generated html code
@register.filter(name='markdown')
def markdown_format(text):
    return mark_safe(markdown.markdown(text))