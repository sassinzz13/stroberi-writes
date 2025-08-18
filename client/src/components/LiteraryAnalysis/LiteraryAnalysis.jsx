"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../Home/Home.module.css";
import Link from "next/link";

const LiteraryAnalysis = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (page = 1) => {
    setLoading(true);
    try {
      // Fetch only posts with the "creative-writing" tag
      const res = await fetch(
        `http://127.0.0.1:8000/api/blog/posts/tag/literary-analysis/?page=${page}`
      );
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data.posts || []);
      setTotalPages(data.total_pages || 1);
      setCurrentPage(data.current_page || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handlePageClick = (page) => setCurrentPage(page);

  return (
    <div className={styles.home}>
      <h1>Creative Writing</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className={styles.grid}>
            {posts.map((post) => {
              const date = new Date(post.publish);
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");

              return (
                <Link
                  href={`/viewcontent/${year}/${month}/${day}/${post.slug}`}
                  key={post.id}
                  className={styles.card}
                >
                  <div className={styles.imageWrapper}>
                    <Image
                      src={
                        post.image
                          ? `https://res.cloudinary.com/dwdhdzva8/${post.image}`
                          : "/STRAWBERRY.png"
                      }
                      alt={post.title || "Post image"}
                      fill
                      className={styles.image}
                    />
                  </div>
                  <p>{date.toDateString()}</p>
                  <h2>{post.title}</h2>
                  <p>{post.body}</p>
                  <p>{post.tags.map((tag) => tag).join(", ")}</p>
                </Link>
              );
            })}
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <button
              onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageClick(i + 1)}
                className={currentPage === i + 1 ? styles.activePage : ""}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => currentPage < totalPages && handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LiteraryAnalysis;
