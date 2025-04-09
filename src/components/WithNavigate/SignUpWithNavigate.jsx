import React from "react";
import { useNavigate } from "react-router-dom";
import SignUpPage from "../SignUpPage/SignUpPage";

const SignUpPageWithNavigate = (props) => {
  const navigate = useNavigate();
  return <SignUpPage {...props} navigate={navigate} />;
};

export default SignUpPageWithNavigate;
