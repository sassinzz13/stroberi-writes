'use client';
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setIsLoggedIn(true);

      fetch("http://127.0.0.1:8000/api/auth/protected/", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          // Access the user object inside data
          setUser(data.user);
          setIsSuperuser(data.user.is_superuser);
        })
        .catch(err => console.error("Error fetching user:", err))
        .finally(() => setLoadingUser(false));
    } else {
      setLoadingUser(false);
    }
  }, []);

  const login = (access, refresh) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    setIsLoggedIn(true);

    fetch("http://127.0.0.1:8000/api/auth/protected/", {
      headers: { Authorization: `Bearer ${access}` },
    })
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
        setIsSuperuser(data.user.is_superuser);
      })
      .catch(err => console.error("Error fetching user after login:", err));
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    setIsSuperuser(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isSuperuser, login, logout, user, loadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};
