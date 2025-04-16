import React, { useState, useEffect } from "react";
import "../styles/ContactRequest.css"
import AdminNavbar from "../components/AdminNavbar";

const ContactRequest = () => {
  const [contactRequests, setContactRequests] = useState([]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/contactUs")
      .then((response) => response.json())
      .then((data) => {
        setContactRequests(data);
        const initialResponses = data.reduce((acc, request) => {
          acc[request.id] = request.response || "";
          return acc;
        }, {});
        setResponses(initialResponses);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleResponseChange = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  const updateResponse = (id) => {
    const updatedRequests = contactRequests.map((request) =>
      request.id === id ? { ...request, response: responses[id] } : request
    );
    setContactRequests(updatedRequests);

    fetch(`http://localhost:3000/contactUs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ response: responses[id] })
    })
      .then((res) => res.json())
      .then(() => console.log("Response updated successfully"))
      .catch((error) => console.error("Error updating response:", error));
  };

  return (
    <div className="contactRequest">
      <AdminNavbar/>
      <div className="contactRequestMainContainer">
      <h2 className="contactRequestHead">Contact Requests</h2>
      {contactRequests.length === 0 ? (
        <p>No contact requests available.</p>
      ) : (
        contactRequests.map((request) => (
          <div className="contactRequestCardContainer">
            <div key={request.id} className="contactRequestCard">
            <p><strong>Name:</strong> {request.name}</p>
            <p><strong>Email:</strong> {request.email}</p>
            <p><strong>Message:</strong> {request.message}</p>
            <p><strong>Response:</strong> {request.response}</p>
            <input
              type="text"
              placeholder="Enter response"
              value={responses[request.id] || ""}
              onChange={(e) => handleResponseChange(request.id, e.target.value)}
            />
            <button onClick={() => updateResponse(request.id)} className="contactRequestButton">Send Response</button>
          </div>
          </div>
        ))
      )}
      </div>
    </div>
  );
};

export default ContactRequest;
