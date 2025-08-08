"use client";
import React from "react";
import styles from "../SeeMore/SeeMore.module.css";
import Image from "next/image";

// This can be replaced with fetched content later
const allPosts = [
  {
    title: "Under the Stars",
    image: "/em.jpg",
    date: "Aug 7, 2025",
    description: "Night sky poetry.",
    category: "Poems",
  },
  {
    title: "Midnight Express",
    image: "/em.jpg",
    date: "Aug 6, 2025",
    description: "Ride into silence.",
    category: "Short Stories",
  },
  {
    title: "Art of War",
    image: "/em.jpg",
    date: "Aug 5, 2025",
    description: "Sun Tzu, remixed.",
    category: "Literary Analysis",
  },
  {
    title: "Rain Dancer",
    image: "/em.jpg",
    date: "Aug 4, 2025",
    description: "A ritual in the storm.",
    category: "Creative Writing",
  },
  {
    title: "Quantum Sleep",
    image: "/em.jpg",
    date: "Aug 3, 2025",
    description: "Science poem.",
    category: "Poems",
  },
  {
    title: "The Sandstorm",
    image: "/em.jpg",
    date: "Aug 2, 2025",
    description: "Blinded by the wind.",
    category: "Short Stories",
  },
];

const SeeMore = () => {
  return (
    <div className={styles.home}>
      <h1>More Contents</h1>
      <div className={styles.grid}>
        {allPosts.map((post, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.imageWrapper}>
              <Image
                src={post.image}
                alt={post.title}
                fill
                className={styles.image}
              />
            </div>
            <p>{post.date}</p>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>{post.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeeMore;
