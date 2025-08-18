from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from taggit.models import Tag
from django.db.models import Count
from django.core.mail import send_mail
from django.contrib.postgres.search import TrigramSimilarity
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer, EmailPostSerializer, SearchSerializer, PostCreateSerializer
from datetime import datetime, timedelta
from django.utils import timezone
ALLOWED_TAGS = ["Creative Writing", "Poems", "Short Stories", "Literary Analysis", "Entertainment"]

# allows us to get the list of posts in the api
@api_view(['GET'])
def get_post_list_api(request, tag_slug=None):
    posts_qs = Post.published.select_related('author').prefetch_related('tags')
    tag = None
    if tag_slug:
        tag = get_object_or_404(Tag, slug=tag_slug)
        if tag.name not in ALLOWED_TAGS:
            return Response({"error": "Tag not allowed."}, status=400)
        posts_qs = posts_qs.filter(tags__in=[tag])

    paginator = Paginator(posts_qs, 6) # adjust this depending on how many contents you want shown in the page
    page_number = request.GET.get('page', 1)
    try:
        posts_page = paginator.page(page_number)
    except (EmptyPage, PageNotAnInteger):
        posts_page = paginator.page(1)

    serializer = PostSerializer(posts_page, many=True)
    return Response({
        "tag": str(tag) if tag else None,
        "total_posts": paginator.count,
        "current_page": posts_page.number,
        "total_pages": paginator.num_pages,
        "posts": serializer.data
    })

# allows us to get the detail of the post
@api_view(['GET'])
def get_post_detail_api(request, year, month, day, slug):
    # Make a timezone-aware datetime
    start = timezone.make_aware(datetime(int(year), int(month), int(day), 0, 0, 0))
    end = start + timedelta(days=1)

    post_obj = get_object_or_404(
        Post.published.prefetch_related('tags', 'comments').select_related('author'),
        slug=slug,
        publish__gte=start,
        publish__lt=end
    )

    comments = post_obj.comments.filter(active=True)
    comments_serializer = CommentSerializer(comments, many=True)

    post_tags_ids = post_obj.tags.values_list('id', flat=True)
    similar_posts = Post.published.filter(tags__in=post_tags_ids).exclude(id=post_obj.id)
    similar_posts = similar_posts.annotate(
        same_tags=Count('tags')
    ).order_by('-same_tags', '-publish')[:4]
    similar_posts_serializer = PostSerializer(similar_posts, many=True)

    post_serializer = PostSerializer(post_obj)

    return Response({
        'post': post_serializer.data,
        'comments': comments_serializer.data,
        'similar_posts': similar_posts_serializer.data
    }, status=status.HTTP_200_OK)

# allows us to share posts through email
@api_view(['POST'])
def post_share_api(request, post_id):
    post = get_object_or_404(Post.published, id=post_id)
    serializer = EmailPostSerializer(data=request.data)
    if serializer.is_valid():
        cd = serializer.validated_data
        post_url = request.build_absolute_uri(post.get_absolute_url())
        subject = f"{cd['name']} ({cd['email']}) recommends you read {post.title}"
        message = f"Read {post.title} at {post_url}\n\n{cd['name']}'s comments: {cd['comments']}"
        send_mail(subject, message, None, [cd['to']])
        return Response({"message": "Email sent successfully."}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# allows us to comment on posts
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_comment_api(request, post_id):
    post = get_object_or_404(Post.published, id=post_id)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        comment = serializer.save(post=post, user=request.user)
        return Response(CommentSerializer(comment).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# for searchbar use this allows us to search through posts
@api_view(['GET'])
def get_post_search_api(request):
    serializer = SearchSerializer(data=request.GET)
    if serializer.is_valid():
        query = serializer.validated_data['query']
        results = (
            Post.published
            .annotate(similarity=TrigramSimilarity('title', query))
            .filter(similarity__gt=0.1)
            .order_by('-similarity')
        )
        return Response(PostSerializer(results, many=True).data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# CRUD OPERATIONS
# for creating posts
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_create_api(request):
    serializer = PostCreateSerializer(data=request.data)
    #check if admin === can post
    if not request.user.is_superuser:
        return Response(
            {"error": "Only admins can create posts."}, 
            status=status.HTTP_403_FORBIDDEN
        )
    if serializer.is_valid():
        post = serializer.save(author=request.user)  # make sure user is authenticated
        return Response({"message": "Post created successfully", "post": serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# for editing posts
@api_view(['PUT', 'PATCH'])
def post_edit_api(request, post_id):
    post = get_object_or_404(Post, id=post_id)

    # Optional: check if request.user is the author
    if request.user != post.author:
        return Response({"error": "You are not allowed to edit this post."}, status=403)

    serializer = PostCreateSerializer(post, data=request.data, partial=True)  # partial=True allows PATCH
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Post updated successfully", "post": serializer.data})
    return Response(serializer.errors, status=400)

# for deleting posts
@api_view(['DELETE'])
def post_delete_api(request, post_id):
    post = get_object_or_404(Post, id=post_id)

    # Optional: check if request.user is the author
    if request.user != post.author:
        return Response({"error": "You are not allowed to delete this post."}, status=403)

    post.delete()
    return Response({"message": "Post deleted successfully"}, status=204)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def comment_edit_api(request, comment_id):
    try:
        comment = Comment.objects.get(id=comment_id, user=request.user)
    except Comment.DoesNotExist:
        return Response({"detail": "Not found or not your comment"}, status=404)

    serializer = CommentSerializer(comment, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def comment_delete_api(request, comment_id):
    try:
        comment = Comment.objects.get(id=comment_id, user=request.user)
    except Comment.DoesNotExist:
        return Response({"detail": "Not found or not your comment"}, status=404)
    
    comment.delete()
    return Response(status=204)
