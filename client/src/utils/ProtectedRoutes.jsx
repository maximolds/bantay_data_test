import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    console.log("Checking for authentication:", isAuthenticated);
    return isAuthenticated === "true" ? <Outlet /> : <Navigate to="/login" />;
  };
  

export default ProtectedRoutes;
