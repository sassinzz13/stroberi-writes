# from django import forms
# from .models import Comment
# # send email function
# class EmailPostForm(forms.Form):
#     name = forms.CharField(max_length=25) #  CharField with a maximum length of 25 characters
#     email = forms.EmailField() #  An instance of EmailField of the person sending the post
#     to = forms.EmailField() # use the email address of the recipient, who will receive an email
#     comments = forms.CharField( # We will use it for comments to include in the post recommendation email
#         required=False,
#         widget=forms.Textarea
#     )

# # send comments to the views
# class CommentForm(forms.ModelForm):
#     class Meta:
#         model = Comment
#         fields = ['body']

# # search form for efficient querying 
# class SearchForm(forms.Form):
#     query = forms.CharField()
    