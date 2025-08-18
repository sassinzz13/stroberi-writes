'use client';
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isSuperuser, loadingUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loadingUser) {
      if (!isLoggedIn || !isSuperuser) {
        // redirect non-admins to home or login
        router.push("/");
      }
    }
  }, [loadingUser, isLoggedIn, isSuperuser, router]);

  if (loadingUser) return <p>Loading...</p>; // optional placeholder while checking

  // Only superusers get to see children
  return isLoggedIn && isSuperuser ? children : null;
};

export default ProtectedRoute;
