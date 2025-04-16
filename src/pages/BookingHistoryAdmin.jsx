import React, { useEffect, useState } from "react";
import "../styles/BookingHistoryAdmin.css"
import AdminNavbar from "../components/AdminNavbar";

const BookingHistoryAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from db.JSON
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/bookingHistory"); // Replace with the actual path to your db.JSON
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBookings(data); // Assuming the JSON structure
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bookingHistoryAdmin">
        <AdminNavbar/>
      <div className="bookingHistoryAdminContainer">
        <div className="bookingHistoryAdminData">
        <h2>Booking History</h2>
      <table border="1" className="bookingHistoryAdminTable">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Booked By</th>
            <th>City</th>
            <th>Parking Station</th>
            <th>Slot</th>
            <th>Check-In Date</th>
            <th>Check-In Time</th>
            <th>Check-Out Date</th>
            <th>Check-Out Time</th>
            <th>Price (₹)</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Checked-In</th>
            <th>Checked-Out</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.BookedBy}</td>
              <td>{booking.city}</td>
              <td>{booking.parkingStation}</td>
              <td>{booking.slot}</td>
              <td>{booking.checkInDate}</td>
              <td>{booking.checkInTime}</td>
              <td>{booking.checkOutDate}</td>
              <td>{booking.checkOutTime}</td>
              <td>{booking.totalPrice}</td>
              <td>{booking.status}</td>
              <td>{booking.payment}</td>
              <td>{booking.CheckedIn ? "Yes" : "No"}</td>
              <td>{booking.CheckedOut ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
      </div>
    </div>
  );
};

export default BookingHistoryAdmin;