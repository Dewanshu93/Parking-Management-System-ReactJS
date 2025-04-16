import React, { useState, useEffect } from "react";
import "../styles/ManageReview.css";
import AdminNavbar from "../components/AdminNavbar";

const ManageReview = () => {
  const [reviews, setReviews] = useState([]);

  // Fetch reviews from db.json
  useEffect(() => {
    fetch("http://localhost:3000/ratings")
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  // Function to remove a review
  const removeReview = (id) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
  };

  return (
    <div className="manageReviewAdmin">
      <AdminNavbar />
      <div className="reviewContainerAdmin">
      <h1 style={{color:"yellow",fontSize:"32px"}}>Manage User Reviews</h1>
        <div className="reviewMainContainerAdmin">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="reviewCardAdmin">
              <h3><strong>Username:</strong> {review.username}</h3>
              <p><strong>Name:</strong> {review.reviewer.name}</p>
              <p><strong>Designation:</strong>{review.reviewer.designation}</p>
              <p style={{textAlign:"start"}}><strong>Review:</strong> {review.comment}</p>
              <p><strong>Rating:</strong> {review.rating} ⭐</p>
              <button onClick={() => removeReview(review.id) } className="adminReviewButton">Remove Review</button>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
        </div>
      </div>
    </div>
  );
};

export default ManageReview;
