"use client";
import React from "react";
import Image from "next/image";
import styles from "../ViewContents/ViewContents.module.css";

const ViewContents = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.articleContainer}>
        <h1 className={styles.title}>The Beauty of Simplicity</h1>

        <div className={styles.imageWrapper}>
          <Image
            src="/em.jpg"
            alt="Banner"
            fill
            className={styles.image}
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>

        <div className={styles.articleContent}>
          <p>
            In today's fast-paced digital world, it's easy to get caught up in the chaos.
            But there's something deeply powerful about simplicity — in design, in writing, and in life.
          </p>
          <p>
            Embracing minimalism doesn’t mean removing all complexity, but rather
            focusing only on what matters. A well-crafted article doesn’t need to shout. It whispers meaningfully.
          </p>
          <p>
            Whether you're designing a product or writing a blog, remember:
            Simplicity is not a lack of content — it's clarity of purpose.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewContents;
