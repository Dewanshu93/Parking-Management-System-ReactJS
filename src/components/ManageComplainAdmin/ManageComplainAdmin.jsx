import React, { useState, useEffect } from "react";
import "./ManageComplainAdmin.css";
import AdminNavbar from "../AdminNavbar/AdminNavbar";

const ManageComplainAdmin = () => {
  const [complaints, setComplaints] = useState([]);
  const [editingResponse, setEditingResponse] = useState(null);
  const [newResponse, setNewResponse] = useState("");

  // Fetch complaints from the database
  useEffect(() => {
    fetch("http://localhost:3000/complains")
      .then((response) => response.json())
      .then((data) => setComplaints(data))
      .catch((error) => console.error("Error fetching complaints:", error));
  }, []);

  // Update complaint status (Resolved/Not Resolved)
  const updateStatus = (id, newStatus) => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, status: newStatus } : complaint
    );
    setComplaints(updatedComplaints);
  };

  // Start editing manager response
  const startEditingResponse = (id, currentResponse) => {
    setEditingResponse(id);
    setNewResponse(currentResponse);
  };

  // Save updated manager response
  const saveResponse = (id) => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, managerResponse: newResponse } : complaint
    );
    setComplaints(updatedComplaints);
    setEditingResponse(null);
  };

  return (
    <div className="complainManagementAdmin">
      <AdminNavbar />
      <div className="adminComplainManagementContainer">
      <h1 className="adminComplainMangementHead">Complaint Management</h1>
      <div className="complainAdminContainer">
        {complaints.map((complaint) => (
          <div key={complaint.id} className="complaintCardAdmin">
            <h3 className="adminComplainHead">Complaint by: {complaint.customerName} (@{complaint.username})</h3>
            <p className="adminComplainHead"><strong>City:</strong> {complaint.city}</p>
            <p className="adminComplainHead"><strong>Parking Station:</strong> {complaint.parkingStation}</p>
            <p className="adminComplainHead"><strong>Complaint Against:</strong> {complaint.complainAgainst}</p>
            <p className="adminComplainHead"><strong>Description:</strong> {complaint.description}</p>

            <label className="adminComplainHead">Status: </label>
            <select
              value={complaint.status}
              onChange={(e) => updateStatus(complaint.id, e.target.value)}
              className="adminComplainSelectStatus"
            >
              <option value="Not Resolved" className="adminComplainSelectStatusOption">Not Resolved</option>
              <option value="Resolved" className="adminComplainSelectStatusOption">Resolved</option>
            </select>

            <h4 className="adminComplainHead">Manager Response:</h4>
            {editingResponse === complaint.id ? (
              <>
                <input
                  type="text"
                  value={newResponse}
                  onChange={(e) => setNewResponse(e.target.value)}
                  className="adminComplainHead"
                />
                <button onClick={() => saveResponse(complaint.id)} className="adminComplainButton">Save</button>
              </>
            ) : (
              <>
                <p className="adminComplainHead">{complaint.managerResponse}</p>
                <button onClick={() => startEditingResponse(complaint.id, complaint.managerResponse)} className="adminComplainButton">
                  Edit Response
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default ManageComplainAdmin;
