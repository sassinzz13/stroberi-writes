"use client";
import React, { useState } from "react";
import styles from "../Login/Login.module.css";

const Login = () => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome Back</h1>
        <form className={styles.form}>
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
            placeholder="enter password"
          />

          <button type="submit" className={styles.button}>
            Log In
          </button>
        </form>

        <p className={styles.footer}>
          Don't have an account? <span className={styles.link}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
