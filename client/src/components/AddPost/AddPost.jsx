"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./AddPost.module.css";
import "quill/dist/quill.snow.css";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState(""); // now Quill content
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState("DF");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  // Auto-generate slug from title
  useEffect(() => {
    const generateSlug = (text) => {
      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
    };
    setSlug(generateSlug(title));
  }, [title]);

  // Initialize Quill editor
  useEffect(() => {
    if (!editorRef.current) return;
    // stops the doubling of quill
    // 🧹 Ensure a clean container every mount
    const container = document.createElement("div");
    container.style.minHeight = "200px";
    container.style.background = "white";
    container.style.marginBottom = "1rem";
    editorRef.current.innerHTML = "";
    editorRef.current.appendChild(container);
    editorRef.current.innerHTML = "";
    editorRef.current.appendChild(container);

    let quillInstance;

    const initQuill = async () => {
      const Quill = (await import("quill")).default;

      quillInstance = new Quill(container, {
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

      quillInstance.root.innerHTML = description;

      quillInstance.on("text-change", () => {
        setDescription(quillInstance.root.innerHTML);
      });

      quillRef.current = quillInstance;
    };

    initQuill();

    return () => {
      // 🧹 Full cleanup
      if (quillRef.current) {
        quillRef.current.off("text-change");
        quillRef.current = null;
      }
      if (editorRef.current) {
        editorRef.current.innerHTML = ""; // reset the wrapper div completely
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("body", description); // Quill HTML
    formData.append("status", status);
    if (image) formData.append("image", image);
    if (tags.length > 0) {
      tags.forEach((tag) => formData.append("tags", tag));
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/blog/posts/create/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(JSON.stringify(data));
      }

      setSuccess("Post saved successfully!");
      setTitle("");
      setSlug("");
      setDescription("");
      if (quillRef.current) {
        quillRef.current.root.innerHTML = "";
      }
      setImage(null);
      setTags([]);
      setStatus("DF");
    } catch (err) {
      setError("Failed to create post: " + err.message + "Try logging in again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.addPostContainer}>
      <h1>Add New Post</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Slug */}
        <input
          type="text"
          placeholder="Slug (auto-generated)"
          className={styles.input}
          value={slug}
          readOnly
        />

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          className={styles.input}
          onChange={(e) => setImage(e.target.files[0])}
        />

        {/* Quill Editor instead of textarea */}
        <label>Description</label>
        <div
          ref={editorRef}
          style={{
            minHeight: "200px",
            background: "white",
            marginBottom: "1rem",
          }}
        />

        {/* Tags */}
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

        {/* Draft/Published */}
        <select
          className={styles.input}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="DF">Draft</option>
          <option value="PB">Published</option>
        </select>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Saving..." : "Save Post"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
    </div>
  );
};

export default AddPost;
