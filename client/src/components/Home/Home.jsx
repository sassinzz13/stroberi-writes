import React from "react";
import styles from "../Home/Home.module.css";
import Image from "next/image";

// dummy blog posts
const blogPosts = [
  {
    title: "Eminem",
    image: "/em.jpg",
    date: "Aug 5, 2025",
    description: "F*** you debbie!!!!",
    category: "Creative Writing",
  },
  {
    title: "Space Invaders",
    image: "/space.jpg",
    date: "Aug 3, 2025",
    description: "Final boss.",
    category: "Poems",
  },
  {
    title: "Lion King",
    image: "/simba.jpg",
    date: "Aug 1, 2025",
    description: "Circle of life.",
    category: "Short Stories",
  },
  {
    title: "P.I.M.P",
    image: "/50cent.jpeg",
    date: "Aug 1, 2025",
    description: "No cadillacs no perms you can see.",
    category: "LIterary Analysis",
  },
  {
    title: "Voom Voom cfmoto Voom",
    image: "/voom.jpg",
    date: "Aug 1, 2025",
    description: "Classic motorcycle by cfmoto",
    category: "Poems",
  },
  {
    title: "Tmax",
    image: "/tmax.jpg",
    date: "Aug 1, 2025",
    description: "Broom.",
    category: "Poems",
  },
];

const Home = () => {
  return (
    <div className={styles.home}>
      <h1>Latest Contents</h1>
      <div className={styles.grid}>
        {/* javascript map logic for indexing dummy jsons */}
        {blogPosts.map((post, index) => (
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
      <div className={styles.seeMore}>
        <p>See more...</p>
      </div>
    </div>
  );
};

export default Home;
