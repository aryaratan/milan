import React from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "./hooks";

const ProtectedRoute = ({ children }) => {
    // const auth = useAuth();
  const isAuthenticated = localStorage.getItem("__milan_token__");

  return isAuthenticated ? children : <Navigate to={"/login"} />;
};

export default ProtectedRoute;