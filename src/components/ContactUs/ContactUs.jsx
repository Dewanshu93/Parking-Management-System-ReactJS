import React from "react";
import { useForm } from "react-hook-form"; // Import useForm
import "./ContactUs.css";

const ContactUs = () => {
    const { register, handleSubmit, reset } = useForm(); // Initialize useForm

    const onSubmit = async (data) => {
        const { name, email, message } = data;
        if (!name || !email || !message) {
            alert("All fields are required!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/contactUs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...data, response: "No Response" }), // Send the form data
            });

            if (response.ok) {
                alert("Message sent successfully!");
                reset(); // Reset the form fields
            } else {
                alert("Failed to send message. Please try again.");
            }
        } catch (error) {
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="mainContainer4">
            <h1 className="contactUsHead">Contact Us</h1>
            <form className="contactForm" onSubmit={handleSubmit(onSubmit)}> {/* Use handleSubmit */}
                <div className="formGroup">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", { required: true })} // Register name input
                        placeholder="Enter your name"
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", { required: true })} // Register email input
                        placeholder="Enter your email"
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        {...register("message", { required: true })} // Register message textarea
                        placeholder="Enter your message"
                    ></textarea>
                </div>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default ContactUs;
