"use client";
import React, { useState } from "react";
import styles from "../SignUp/SignUp.module.css";

const SignUp = () => {
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create an Account</h1>
        <form className={styles.form}>
          <label>Name</label>
          <input
            type="text"
            required
            placeholder="Jane Doe"
          />

          <label>Email</label>
          <input
            type="email"
            required
            placeholder="you@example.com"
          />

          <label>Password</label>
          <input
            type="password"
            required
            placeholder="password"
          />

          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </form>

        <p className={styles.footer}>
          Already have an account?{" "}
          <span className={styles.link}>Log in</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
