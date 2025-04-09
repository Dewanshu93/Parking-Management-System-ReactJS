import React, { useEffect, useState } from "react";
import "./ComplainHistory.css";
import Navbar from "../Navbar/Navbar";

const ComplainHistory = () => {
    const [complains, setComplains] = useState([]);
    const username = localStorage.getItem("username");

    useEffect(() => {
        const fetchComplains = async () => {
            try {
                const response = await fetch("http://localhost:3000/complains");
                const data = await response.json();
                const userComplains = data.filter(complain => complain.username === username);
                setComplains(userComplains);
            } catch (error) {
                console.error("Error fetching complaints:", error);
            }
        };
        fetchComplains();
    }, [username]);

    const handleResolve = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/complains/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "Resolved" })
            });
            
            if (response.ok) {
                setComplains(complains.map(complain => 
                    complain.id === id ? { ...complain, status: "Resolved" } : complain
                ));
            } else {
                console.error("Failed to update complaint status");
            }
        } catch (error) {
            console.error("Error updating complaint status:", error);
        }
    };

    return (
        <div className="complainHistory">
            <Navbar/>
            <div className="complainHistoryMainCOntainer">
            <h2 className="complainHistoryHead">My Complaint History</h2>
            {complains.length === 0 ? (
                <p>No complaints found.</p>
            ) : (
                <ul className="complainHistoryContentContainer">
                    {complains.map(complain => (
                        <li key={complain.id} className="complainHistoryCard">
                            <p style={{textAlign:"start"}}><strong style={{textAlign:"start"}}>City:</strong> {complain.city}</p>
                            <p style={{textAlign:"start"}}><strong style={{textAlign:"start"}}>Parking Station:</strong> {complain.parkingStation}</p>
                            <p style={{textAlign:"start"}}><strong style={{textAlign:"start"}}>Complaint Against:</strong> {complain.complainAgainst}</p>
                            <p style={{textAlign:"start"}}><strong style={{textAlign:"start"}}>Description:</strong> {complain.description}</p>
                            <p style={{textAlign:"start"}}><strong style={{textAlign:"start"}}>Status:</strong> {complain.status}</p>
                            <p style={{textAlign:"start"}}><strong style={{textAlign:"start"}}>Manager Response:</strong> {complain.managerResponse}</p>
                            {complain.status !== "Resolved" && (
                                <button className="resolve-btn" onClick={() => handleResolve(complain.id)}>
                                    Mark as Resolved
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
            </div>
        </div>
    );
};

export default ComplainHistory;
