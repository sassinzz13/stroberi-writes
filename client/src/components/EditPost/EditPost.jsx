"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "../AddPost/AddPost.module.css";
import "quill/dist/quill.snow.css";

const EditPost = () => {
  const { year, month, day, slug } = useParams();
  const router = useRouter();

  const [postId, setPostId] = useState(null); // store post ID
  const [title, setTitle] = useState("");
  const [slugValue, setSlugValue] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState("DF");
  const [publish, setPublish] = useState(""); // store post's publish date
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  // Auto-generate slug when title changes
  useEffect(() => {
    const generateSlug = (text) => {
      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
    };
    setSlugValue(generateSlug(title));
  }, [title]);

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/blog/posts/${year}/${month}/${day}/${slug}/`
        );
        if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);
        const data = await res.json();
        const post = data.post;
        setPostId(post.id);
        setTitle(post.title);
        setSlugValue(post.slug);
        setDescription(post.body);
        setTags(post.tags || []);
        setStatus(post.status);
        setPublish(post.publish); // store original publish date
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [year, month, day, slug]);

  // Initialize Quill once after post is loaded
  useEffect(() => {
    if (!editorRef.current || loading || quillRef.current) return; // only init once

    const container = document.createElement("div");
    container.style.minHeight = "200px";
    container.style.background = "white";
    container.style.marginBottom = "1rem";
    editorRef.current.innerHTML = "";
    editorRef.current.appendChild(container);

    const initQuill = async () => {
      const Quill = (await import("quill")).default;
      const quillInstance = new Quill(container, {
        theme: "snow",
        placeholder: "Write your description here...",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        },
      });

      quillInstance.root.innerHTML = description; // set initial content

      quillInstance.on("text-change", () => {
        setDescription(quillInstance.root.innerHTML);
      });

      quillRef.current = quillInstance;
    };

    initQuill();

    return () => {
      if (quillRef.current) {
        quillRef.current.off("text-change");
        quillRef.current = null;
      }
      if (editorRef.current) editorRef.current.innerHTML = "";
    };
  }, [loading]); // remove `description` from deps

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    if (!postId) {
      setError("Post ID not found.");
      setSaving(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slugValue);
    formData.append("body", description);
    formData.append("status", status);
    formData.append("publish", publish || new Date().toISOString());
    if (image) formData.append("image", image);
    if (tags.length > 0) tags.forEach((tag) => formData.append("tags", tag));

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/blog/posts/${postId}/edit/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(JSON.stringify(data));
      }

      setSuccess("Post updated successfully!");
      router.push(`/viewcontent/${year}/${month}/${day}/${slugValue}`);
    } catch (err) {
      setError("Failed to update post: " + err.message + "Try logging in again");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading post...</p>;

  return (
    <div className={styles.addPostContainer}>
      <h1>Edit Post</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Slug (auto-generated)"
          className={styles.input}
          value={slugValue}
          readOnly
        />
        <input
          type="file"
          accept="image/*"
          className={styles.input}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label>Description</label>
        <div
          ref={editorRef}
          style={{
            minHeight: "200px",
            background: "white",
            marginBottom: "1rem",
          }}
        />
        <select
          className={styles.input}
          value={tags[0] || ""}
          onChange={(e) => setTags([e.target.value])}
        >
          <option value="" disabled>
            Select a tag
          </option>
          <option value="Creative Writing">Creative Writing</option>
          <option value="Poems">Poems</option>
          <option value="Short Stories">Short Stories</option>
          <option value="Literary Analysis">Literary Analysis</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <select
          className={styles.input}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="DF">Draft</option>
          <option value="PB">Published</option>
        </select>
        <button type="submit" className={styles.submitBtn} disabled={saving}>
          {saving ? "Saving..." : "Update Post"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
    </div>
  );
};

export default EditPost;
