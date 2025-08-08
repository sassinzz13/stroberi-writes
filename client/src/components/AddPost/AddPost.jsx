"use client";
import React, { useState } from "react";
import styles from "./AddPost.module.css";

const AddPost = () => {
  const [description, setDescription] = useState("");

  return (
    <div className={styles.addPostContainer}>
      <h1>Add New Post</h1>

      <form className={styles.form}>
        <input type="text" placeholder="Title" className={styles.input} />

        <input type="file" accept="image/*" className={styles.input} />
        
        <textarea
          className={styles.textarea}
          placeholder="Write your description here..."
        ></textarea>

        <button type="submit" className={styles.submitBtn}>Post</button>
      </form>
    </div>
  );
};

export default AddPost;
