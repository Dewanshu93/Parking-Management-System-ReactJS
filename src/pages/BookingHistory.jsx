import React, { useState, useEffect } from "react";
import "../styles/BookingHistory.css"; // Using the same styling as MyBookings
import Navbar from "../components/Navbar";

const BookingHistory = () => {
    const [history, setHistory] = useState([]);
    const username=localStorage.getItem("username");

    useEffect(() => {
        console.log(history)
        // Fetch booking history data from db.JSON
        const fetchHistory = async () => {
            try {
                const response = await fetch("http://localhost:3000/bookingHistory");
                const data = await response.json();
                const fiteredData=data.filter(d=>d.BookedBy===username && d.payment==="Success");
                setHistory(fiteredData);
            } catch (error) {
                console.error("Error fetching booking history:", error);
            }
        };
        fetchHistory();
    }, []);

    return (
        <div className="mainContainerBooking">
            <Navbar />
            <div className="inContainerMyBookings">
                <h1 className="bookingHeader">Booking History</h1>
                <div className="bookingList">
                    {history.length > 0 ? (
                        history.map((entry) => (
                            <div key={entry.id} className="bookingCard">
                                <div className="bookingCardInContainer">
                                    <p className="bookDetails">City: {entry.city}</p>
                                    <p className="bookDetails">Parking Station: {entry.parkingStation}</p>
                                    <p className="bookDetails">Slot: {entry.slot}</p>
                                    <p className="bookDetails">Check-In Date: {entry.checkInDate}</p>
                                    <p className="bookDetails">Check-In Time: {entry.checkInTime}</p>
                                    <p className="bookDetails">Check-Out Date: {entry.checkOutDate}</p>
                                    <p className="bookDetails">Check-Out Time: {entry.checkOutTime}</p>
                                    <p className="bookDetails">Total Price: ₹{entry.totalPrice}</p>
                                    <p className="bookDetails">Status: {entry.status}</p>
                                    <p className="bookDetails">Payment Status: {entry.payment}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="noData">No booking history available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingHistory;
