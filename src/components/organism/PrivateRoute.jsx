import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function PrivateRoute({ element }) {
  const { isLoggedIn } = useAuth();

  // Jika user tidak login, redirect ke halaman login
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Jika user login, render halaman yang diinginkan
  return element;
}

export default PrivateRoute;
