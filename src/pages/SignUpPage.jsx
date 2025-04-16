import React from "react";
import { useForm } from "react-hook-form"; // Import useForm
import "../styles/SignUpPage.css";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm(); // Initialize useForm
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            if (!data.email.endsWith("@gmail.com")) {
                alert("Invalid Email Address. Please use a @gmail.com email.");
                return;
            }

            const getResponse = await fetch("http://localhost:3000/users");
            const getData = await getResponse.json();

            const existingUser = getData.find(
                (eachData) => eachData.username === data.username
            );

            if (!existingUser) {
                const response = await fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    alert("User registered successfully!");
                } else {
                    alert("Failed to register the user.");
                }
            } else {
                alert("Already Exists");
                navigate("/login");
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="mainContainerSIgnUp">
            <div className="centerContainer2">
                <h1 className="head2">
                    Park <span className="King">King</span>
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}> {/* Use handleSubmit */}
                    <input
                        type="text"
                        className="input1"
                        placeholder="Please Enter Your Name"
                        {...register("name", { required: "Name field is required." })} // Register input
                    />
                    {errors.name && <p className="error">{errors.name.message}</p>}
                    
                    <input
                        type="text"
                        className="input1"
                        placeholder="Please Enter Your Contact Number"
                        {...register("contact", { required: "Contact number field is required." })}
                    />
                    {errors.contact && <p className="error">{errors.contact.message}</p>}
                    
                    <input
                        type="text"
                        className="input1"
                        placeholder="Please Enter Your Email Address"
                        {...register("email", { required: "Email address field is required." })}
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                    
                    <input
                        type="text"
                        className="input1"
                        placeholder="Please Enter Username"
                        {...register("username", { required: "Username field is required." })}
                    />
                    {errors.username && <p className="error">{errors.username.message}</p>}
                    
                    <input
                        type="text"
                        className="input1"
                        placeholder="Please Enter License Number"
                        {...register("license", { required: "License number field is required." })}
                    />
                    {errors.license && <p className="error">{errors.license.message}</p>}
                    
                    <input
                        type="password"
                        className="input1"
                        placeholder="Please enter password"
                        {...register("password", { required: "Password field is required." })}
                    />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                    
                    <br />
                    <button className="btn1" type="submit">
                        Sign Up
                    </button>
                    <br />
                </form>
                <Link to="/login" className="anchorEl2">
                    Already a User? Login
                </Link>
            </div>
        </div>
    );
};

export default SignUpPage;
