import React from "react";
import styles from "../TopBar/TopBar.module.css";
import Image from "next/image";

const TopBar = () => {
  return (
    <div className={styles.topbar}>
      <Image
        src="/STRAWBERRY.png"
        alt="Site Logo"
        width={40}
        height={40}
        className={styles.logo}
      />
      <h1>Stroberi-Writes</h1>
    </div>
  );
};

export default TopBar;
