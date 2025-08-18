# from django.urls import path
# from . import views
# from .feeds import LatestPostsFeed
# from . import api_views  # new: DRF views

# app_name = 'blog'

# urlpatterns = [
#     path('', views.post_list, name='post_list'), # post list is our default 
#     path('<int:year>/<int:month>/<int:day>/<slug:post>/', views.post_detail, name='post_detail'), #post detail takes in a url of an integer id (ex. /1)
#     path('<int:post_id>/share/', views.post_share, name='post_share'), # email path
#     path('<int:post_id>/comment/', views.post_comment, name='post_comment'), # our comments url
#     path('tag/<slug:tag_slug>/', views.post_list, name='post_list_by_tag'), # tagging urls
#     path('feed/', LatestPostsFeed(), name='post_feed'), # Latest feed urls
#     path('search/', views.post_search, name='post_search'), # for searching
# ]