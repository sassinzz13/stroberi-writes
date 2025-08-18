'use client'
import React, { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import styles from "../Login/Login.module.css";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/config";
const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();

      // Update context
      login(data.access, data.refresh);

      // Redirect after login
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome Back</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="your username"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter password"
            required
          />

          <button type="submit" className={styles.button}>
            Log In
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Don't have an account?{" "}
          <button
            onClick={() => router.push("/register")}
            className={styles.button}
            style={{ padding: "0.5rem 1rem", fontSize: "0.9rem", cursor: "pointer" }}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
