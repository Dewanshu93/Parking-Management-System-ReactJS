import React, { useState, useEffect } from "react";
import "../styles/MyBookings.css";
import Navbar from "../components/Navbar";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [editBooking, setEditBooking] = useState(null);
    const username=localStorage.getItem("username");

    useEffect(() => {
        // Fetch booking data from db.JSON
        const fetchBookings = async () => {
            try {
                const response = await fetch("http://localhost:3000/bookingHistory");
                const data = await response.json();
                const filteredData=data.map(d=>d.BookedBy===username);
                setBookings(filteredData);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };
        fetchBookings();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/bookingHistory/${id}`, {
                method: "DELETE",
            });
            setBookings(bookings.filter((booking) => booking.id !== id));
        } catch (error) {
            alert("Failed to delete booking. Please try again.");
        }
    };

    const handleEdit = (booking) => {
        setEditBooking(booking);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            await fetch(`http://localhost:3000/bookingHistory/${editBooking.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editBooking),
            });
            setBookings(
                bookings.map((booking) =>
                    booking.id === editBooking.id ? editBooking : booking
                )
            );
            setEditBooking(null);
        } catch (error) {
            alert("Failed to update booking. Please try again.");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditBooking((prevBooking) => ({
            ...prevBooking,
            [name]: value,
        }));
    };

    const handleCloseModal = () => {
        setEditBooking(null);
    };

    return (
        <div className="mainContainerBooking">
            <Navbar/>
            <div className="inContainerMyBookings">
            <div className="bookingList">
                {bookings.map((booking) => (
                    <div key={booking.id} className="bookingCard">
                        <div className="bookingCardInContainer">
                        <p>City: {booking.city}</p>
                        <p>Parking Station: {booking.parkingStation}</p>
                        <p>Slot: {booking.slot}</p>
                        <p>Check-In Date: {booking.checkInDate}</p>
                        <p>Check-In Time: {booking.checkInTime}</p>
                        <p>Check-Out Date: {booking.checkOutDate}</p>
                        <p>Check-Out Time: {booking.checkOutTime}</p>
                        <p>Total Price: {booking.totalPrice}</p>
                        <p>Status: {booking.status}</p>
                        </div>
                        <div className="bookingActions">
                            <button onClick={() => handleEdit(booking)} className="editButton">Edit</button>
                            <button onClick={() => handleDelete(booking.id)} className="deleteButton">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            </div>
            {editBooking && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <button className="modalClose" onClick={handleCloseModal}>
                            &times;
                        </button>
                        <h2>Edit Booking</h2>
                        <form onSubmit={handleUpdate}>
                            <label>Slot:</label>
                            <input
                                type="text"
                                name="slot"
                                value={editBooking.slot}
                                onChange={handleChange}
                            />
                            <label>Check-In Date:</label>
                            <input
                                type="date"
                                name="checkInDate"
                                value={editBooking.checkInDate}
                                onChange={handleChange}
                            />
                            <label>Check-In Time:</label>
                            <input
                                type="time"
                                name="checkInTime"
                                value={editBooking.checkInTime}
                                onChange={handleChange}
                            />
                            <label>Check-Out Date:</label>
                            <input
                                type="date"
                                name="checkOutDate"
                                value={editBooking.checkOutDate}
                                onChange={handleChange}
                            />
                            <label>Check-Out Time:</label>
                            <input
                                type="time"
                                name="checkOutTime"
                                value={editBooking.checkOutTime}
                                onChange={handleChange}
                            />
                            <button type="submit">Update Booking</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBookings;
