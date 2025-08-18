from django.urls import path
from . import api_views

urlpatterns = [
    path('posts/', api_views.get_post_list_api, name='post_list_api'),
    path('posts/tag/<slug:tag_slug>/', api_views.get_post_list_api, name='post_list_by_tag_api'),
    path('posts/<int:year>/<int:month>/<int:day>/<slug:slug>/', api_views.get_post_detail_api, name='post_detail_api'),
    path('posts/<int:post_id>/share/', api_views.post_share_api, name='post_share_api'),
    path('posts/<int:post_id>/comment/', api_views.post_comment_api, name='post_comment_api'),
    path('posts/search/', api_views.get_post_search_api, name='post_search_api'),
    path('posts/create/', api_views.post_create_api, name='post_create_api'),
    path('posts/<int:post_id>/edit/', api_views.post_edit_api, name='post_edit_api'),
    path('posts/<int:post_id>/delete/', api_views.post_delete_api, name='post_delete_api'),
    path('comments/<int:comment_id>/edit/', api_views.comment_edit_api, name='comment_edit_api'),
    path('comments/<int:comment_id>/delete/', api_views.comment_delete_api, name='comment_delete_api'),

]
