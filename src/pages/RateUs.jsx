import React, { useState } from "react";
import "../styles/RateUs.css";
import Navbar from "../components/Navbar";

const RateUs = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const username=localStorage.getItem("username")
        if (!rating || !comment || !name || !designation) {
            setMessage("Please provide all required fields: rating, comment, name, and designation.");
            return;
        }

        const newRating = {
            username,
            rating,
            comment,
            reviewer: {
                name,
                designation,
            },
            date: new Date().toLocaleDateString(), // Captures current date
        };

        try {
            const response = await fetch("http://localhost:3000/ratings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newRating),
            });

            if (response.ok) {
                setMessage("Thank you for your feedback!");
                setRating(0);
                setComment("");
                setName("");
                setDesignation("");
            } else {
                setMessage("Failed to submit your feedback. Please try again.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="rateUsMainContainer">
            <Navbar />
            <div className="rateUsPage">
                <div className="rateUsContainer">
                    <h1 className="rateUsHeader">Rate Us</h1>
                    <form className="rateUsForm" onSubmit={handleSubmit}>
                        {/* Star Rating */}
                        <div className="starsContainer">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${star <= (hover || rating) ? "filled" : ""}`}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                    onClick={() => setRating(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>

                        {/* Reviewer Name Input */}
                        <input
                            type="text"
                            className="nameInput"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                        />

                        {/* Reviewer Designation Input */}
                        <input
                            type="text"
                            className="designationInput"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            placeholder="Your Designation"
                        />

                        {/* Comment Box */}
                        <textarea
                            className="commentBox"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write your comment here..."
                        ></textarea>

                        {/* Submit Button */}
                        <button type="submit" className="submitButton">Submit</button>

                        {/* Display Message */}
                        {message && <p className="message">{message}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RateUs;
