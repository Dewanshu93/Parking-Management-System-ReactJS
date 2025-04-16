import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteManager = ({ children }) => {

  const isManager=localStorage.getItem("isManager")==="true";
  
  
  if(!isManager){
    return <Navigate to="/ManagerLogin" replace/>
  }
  
  return children;
};

export default ProtectedRouteManager;
