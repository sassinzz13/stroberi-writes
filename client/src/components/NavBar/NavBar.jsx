'use client';
import React, { useContext, useState, useEffect, useRef } from "react";
import styles from "../NavBar/NavBar.module.css";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const { isLoggedIn, isSuperuser, loadingUser, logout } = useContext(AuthContext);
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // new state for burger menu

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    if (!query.trim()) { setResults([]); return; }

    const timeout = setTimeout(() => {
      fetch(`http://127.0.0.1:8000/api/blog/posts/search/?query=${encodeURIComponent(query)}`)
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .then(data => { setResults(data); setShowDropdown(true); })
        .catch(err => console.error("Search failed:", err));
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mounted]);

  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      await fetch("http://127.0.0.1:8000/api/auth/logout/", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
    } catch (err) { console.error("Logout failed", err); }
    logout();
    router.push("/login");
  };

  const handleResultClick = (post) => {
    const date = new Date(post.publish);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    router.push(`/viewcontent/${year}/${month}/${day}/${post.slug}`);
    setShowDropdown(false);
    setQuery("");
    setMenuOpen(false); // close menu after selecting
  };

  return (
    <div className={styles.navbar}>
      {/* Burger menu icon */}
      <div className={styles.burgerIcon} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      {/* Nav items */}
      <div className={`${styles.navbarContent} ${menuOpen ? styles.navOpen : ""}`}>
        <p className={styles.navbarItem} onClick={() => router.push("/")}>Home</p>
        <p className={styles.navbarItem} onClick={() => router.push("/creative-writing")}>Creative Writing</p>
        <p className={styles.navbarItem} onClick={() => router.push("/poems")}>Poems</p>
        <p className={styles.navbarItem} onClick={() => router.push("/short-stories")}>Short Stories</p>
        <p className={styles.navbarItem} onClick={() => router.push("/literary-analysis")}>Literary Analysis</p>
        <p className={styles.navbarItem} onClick={() => router.push("/entertainment")}>Entertainment</p>

        {!loadingUser && isLoggedIn && isSuperuser && (
          <p className={styles.navbarItem} onClick={() => router.push("/add-post")}>Add Post</p>
        )}
      </div>

      {/* Search */}
      {mounted && (
        <div className={styles.searchContainer} ref={dropdownRef}>
          <input
            type="search"
            placeholder="Search posts..."
            className={styles.navbarSearch}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query && setShowDropdown(true)}
          />
          {showDropdown && results.length > 0 && (
            <ul className={styles.searchDropdown}>
              {results.map((post) => (
                <li
                  key={post.id}
                  className={styles.searchDropdownItem}
                  onClick={() => handleResultClick(post)}
                >
                  {post.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {!isLoggedIn ? (
        <p className={styles.navbarItem} onClick={() => router.push("/login")}>Log in</p>
      ) : (
        <p className={styles.navbarItem} onClick={handleLogout}>Log out</p>
      )}
    </div>
  );
};

export default NavBar;
