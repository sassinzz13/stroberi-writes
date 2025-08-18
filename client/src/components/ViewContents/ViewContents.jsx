"use client";
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import styles from "../ViewContents/ViewContents.module.css";
import { AuthContext } from "@/context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import parse from "html-react-parser";
import "quill/dist/quill.snow.css";
import { BACKEND_URL } from "@/config";

const ViewContents = () => {
  const { year, month, day, slug } = useParams();
  const { isLoggedIn, isSuperuser, user, loadingUser } =
    useContext(AuthContext);
  const router = useRouter();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState({ body: "" });
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentBody, setEditingCommentBody] = useState("");
  const [postingComment, setPostingComment] = useState(false);

  // Fetch post and comments
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const url = `${BACKEND_URL}/api/blog/posts/${year}/${month}/${day}/${slug}/`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);
        const data = await res.json();
        setPost(data.post);
        setComments(data.comments || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [year, month, day, slug]);

  // ===== COMMENTS =====
  const handleCommentChange = (e) =>
    setNewComment({ ...newComment, [e.target.name]: e.target.value });

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!post) return;
    setPostingComment(true);
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `${BACKEND_URL}/api/blog/posts/${post.id}/comment/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ body: newComment.body }),
        }
      );
      if (!res.ok) throw new Error(`Failed to post comment: ${res.status}`);
      const savedComment = await res.json();
      setComments([savedComment, ...comments]);
      setNewComment({ body: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setPostingComment(false);
    }
  };

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentBody(comment.body);
  };

  const handleEditChange = (e) => setEditingCommentBody(e.target.value);

  const handleEditSubmit = async (commentId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `${BACKEND_URL}/api/blog/comments/${commentId}/edit/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ body: editingCommentBody }),
        }
      );
      if (!res.ok) throw new Error(`Failed to edit comment: ${res.status}`);
      const updatedComment = await res.json();
      setComments(
        comments.map((c) => (c.id === commentId ? updatedComment : c))
      );
      setEditingCommentId(null);
      setEditingCommentBody("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `${BACKEND_URL}/api/blog/comments/${commentId}/delete/`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error(`Failed to delete comment: ${res.status}`);
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error(err);
    }
  };

  // ===== POST DELETE =====
  const handleDeletePost = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `${BACKEND_URL}/api/blog/posts/${post.id}/delete/`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error(`Failed to delete post: ${res.status}`);
      alert("Post deleted!");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Failed to delete post.");
    }
  };

  if (loading || loadingUser) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.articleContainer}>
        <h1 className={styles.title}>{post.title}</h1>

        {post.image && (
          <div className={styles.imageWrapper}>
            <Image
              src={`https://res.cloudinary.com/dwdhdzva8/${post.image}`}
              alt={post.title}
              fill
              className={styles.image}
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>
        )}

        <div className={styles.articleContent}>
          <div className="ql-editor">
            {post.body ? parse(post.body) : <p>No content available.</p>}
          </div>
        </div>

        {/* ===== SUPERUSER POST ACTIONS ===== */}
        {isLoggedIn && isSuperuser && (
          <div className={styles.articleActions}>
            <button
              className={styles.editButton}
              onClick={() => {
                router.push(`/edit-post/${year}/${month}/${day}/${slug}`);
              }}
            >
              Edit Post
            </button>
            <button className={styles.deleteButton} onClick={handleDeletePost}>
              Delete Post
            </button>
          </div>
        )}

        {/* ===== COMMENTS ===== */}
        <div className={styles.commentsSection}>
          <h2>Comments</h2>

          {isLoggedIn ? (
            <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
              <textarea
                name="body"
                placeholder="Add a comment..."
                value={newComment.body}
                onChange={handleCommentChange}
                required
              />
              <button type="submit" disabled={postingComment}>
                {postingComment ? "Posting..." : "Post Comment"}
              </button>
            </form>
          ) : (
            <p>You must be logged in to post a comment.</p>
          )}

          <div className={styles.commentList}>
            {comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className={styles.comment}>
                  <p className={styles.commentAuthor}>
                    {comment.user || "Anonymous"}:
                  </p>

                  {editingCommentId === comment.id ? (
                    <>
                      <textarea
                        value={editingCommentBody}
                        onChange={handleEditChange}
                        className={styles.editTextarea}
                      />
                      <button onClick={() => handleEditSubmit(comment.id)}>
                        Save
                      </button>
                      <button onClick={() => setEditingCommentId(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <p>{comment.body}</p>
                  )}

                  {comment.user === user?.username &&
                    editingCommentId !== comment.id && (
                      <div className={styles.commentActions}>
                        <button onClick={() => handleEditClick(comment)}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteComment(comment.id)}>
                          Delete
                        </button>
                      </div>
                    )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewContents;
