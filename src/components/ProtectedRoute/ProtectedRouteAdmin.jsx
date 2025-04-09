import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteAdmin = ({ children }) => {

  
  const isAdmin=localStorage.getItem("isAdmin")==="true"
  
  
  
  if(!isAdmin){
    return <Navigate to="/AdminLogin" replace/>
  }
  return children;
};

export default ProtectedRouteAdmin;
