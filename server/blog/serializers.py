from rest_framework import serializers
from .models import Comment, Post
from taggit.models import Tag
# Email serializer (for sending a post via email)
class EmailPostSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=25)
    email = serializers.EmailField()
    to = serializers.EmailField()
    comments = serializers.CharField(required=False, allow_blank=True)

# Comment serializer (ModelSerializer equivalent of CommentForm)
class CommentSerializer(serializers.ModelSerializer):
     user = serializers.StringRelatedField(read_only=True)
     class Meta:
        model = Comment
        fields = ['id', 'user', 'body', 'created']

# Search serializer (for query parameter handling)
class SearchSerializer(serializers.Serializer):
    query = serializers.CharField()

# For fetching the posts
class PostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')

    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'author', 'body', 'publish', 'status', 'tags', 'image']

# for uploading posts

ALLOWED_TAGS = ["Creative Writing", "Poems", "Short Stories", "Literary Analysis", "Entertainment"]

class PostCreateSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(
        many=True,
        queryset=Tag.objects.filter(name__in=ALLOWED_TAGS),
        slug_field='name',
        required=False
    )
    class Meta:
        model = Post
        fields = ['title', 'slug', 'body', 'status', 'tags', 'image', 'publish']
    
    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])

        # Create the post first
        post = Post.objects.create(**validated_data)

        # Handle tags: create any that don't exist
        tag_objs = []
        for tag_name in tags_data:
            tag, created = Tag.objects.get_or_create(name=tag_name)
            tag_objs.append(tag)

        # Assign tags to the post
        post.tags.set(tag_objs)
        return post
    
    def update(self, instance, validated_data):
        tags_data = validated_data.pop('tags', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if tags_data is not None:
            tag_objs = []
            for tag_name in tags_data:
                tag, _ = Tag.objects.get_or_create(name=tag_name)
                tag_objs.append(tag)
            instance.tags.set(tag_objs)

        return instance