import React from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage"; 

const LoginPageWithNavigate = (props) => {
  const navigate = useNavigate();
  return <LoginPage {...props} navigate={navigate} />;
};

export default LoginPageWithNavigate;
