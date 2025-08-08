import React from "react";
import styles from "../NavBar/NavBar.module.css";
const NavBar = () => {
  return (
    // container will be black
    <div className={styles.navbar}>
      <div className={styles.navbarContent}>
        <p className={styles.navbarItem}>Home</p>
        <p className={styles.navbarItem}>Creative Writing</p>
        <p className={styles.navbarItem}>Poems</p>
        <p className={styles.navbarItem}>Short Stories</p>
        <p className={styles.navbarItem}>Literary Analysis</p>
        <p className={styles.navbarItem}>Entertainment</p>
      </div>
      {/* add this */}
      <input
        type="search"
        placeholder="Search posts..."
        className={styles.navbarSearch}
      />
      <p className={styles.navbarItem}>Log in</p>
    </div>
  );
};

export default NavBar;
