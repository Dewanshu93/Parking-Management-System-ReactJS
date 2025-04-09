import React, { useState, useEffect } from "react";
import "./BookNowPage.css";

const BookNowPage = () => {
    const [cityLocations, setCityLocations] = useState([]);
    const [parkingStations, setParkingStations] = useState([]);
    const [parkingSlots, setParkingSlots] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedParkingStation, setSelectedParkingStation] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [checkInTime, setCheckInTime] = useState("");
    const [checkOutTime, setCheckOutTime] = useState("");
    const [bookingMessage, setBookingMessage] = useState("");
    const username=localStorage.getItem("username");

    const handleNewBooking = () => {
        setSelectedCity("");
        setSelectedParkingStation("");
        setSelectedSlot("");
        setCheckInDate("");
        setCheckOutDate("");
        setCheckInTime("");
        setCheckOutTime("");
        setBookingMessage("");
        setParkingStations([]);
        setParkingSlots([]);
    };

    const getLocation = async () => {
        try {
            const response = await fetch("http://localhost:3000/cityLocations");
            const data = await response.json();
            setCityLocations(data);
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    const handleCityChange = (event) => {
        const selectedCity = event.target.value;
        const cityData = cityLocations.find((city) => city.city === selectedCity);
        setSelectedCity(selectedCity);
        setParkingStations(cityData ? cityData.parkingStations : []);
        setSelectedParkingStation("");
        setParkingSlots([]);
        setSelectedSlot("");
        setCheckInDate("");
        setCheckOutDate("");
        setCheckInTime("");
        setCheckOutTime("");
        setBookingMessage("");
    };

    const handleParkingStationChange = (event) => {
        const selectedParkingStation = event.target.value;
        const stationData = cityLocations
            .find((city) => city.city === selectedCity)
            .parkingStations.find((station) => station.name === selectedParkingStation);
        const slots = stationData ? stationData.slots : [];
        setSelectedParkingStation(selectedParkingStation);
        setParkingSlots(slots);
        setSelectedSlot("");
        setCheckInDate("");
        setCheckOutDate("");
        setCheckInTime("");
        setCheckOutTime("");
        setBookingMessage("");
    };

    const handleSlotChange = (event) => {
        setSelectedSlot(event.target.value);
    };

    const handleCheckInDateChange = (event) => {
        setCheckInDate(event.target.value);
    };

    const handleCheckOutDateChange = (event) => {
        setCheckOutDate(event.target.value);
    };

    const handleCheckInTimeChange = (event) => {
        setCheckInTime(event.target.value);
    };

    const handleCheckOutTimeChange = (event) => {
        setCheckOutTime(event.target.value);
    };

    const handleBooking = async () => {
        const bookingDetails = {
            id: Math.random().toString(36).substring(2, 8), // Generate a random unique ID
            BookedBy: username,
            city: selectedCity,
            parkingStation: selectedParkingStation,
            slot: selectedSlot,
            checkInDate,
            checkInTime,
            checkOutDate,
            checkOutTime,
        };
    
        try {
            const userDetailsResponse = await fetch("http://localhost:3000/users");
            const userDetails = await userDetailsResponse.json();
            const user = userDetails.find(u => u.username === username);
    
            const cityLocationsResponse = await fetch("http://localhost:3000/cityLocations");
            const cityLocations = await cityLocationsResponse.json();
    
            const city = cityLocations.find((c) => c.city === selectedCity);
            if (!city) {
                console.error("City not found:", selectedCity);
                setBookingMessage("City not found. Please check your selection.");
                return;
            }
    
            const parkingStation = city.parkingStations.find(
                (station) => station.name === selectedParkingStation
            );
            if (!parkingStation) {
                console.error("Parking station not found:", selectedParkingStation);
                setBookingMessage("Parking station not found. Please check your selection.");
                return;
            }
    
            const slot = parkingStation.slots.find(
                (s) => s.slotNumber === Number(selectedSlot) // Convert selectedSlot to number
            );
            if (!slot) {
                console.error("Slot not found:", selectedSlot);
                setBookingMessage("Slot not found. Please check your selection.");
                return;
            }
    
            const slotPrice = slot.price;
    
            // Convert booking time to Date objects
            const newBookingStart = new Date(`${checkInDate}T${checkInTime}`);
            const newBookingEnd = new Date(`${checkOutDate}T${checkOutTime}`);
    
            // **Check for overlapping bookings**
            const bookingHistoryResponse = await fetch("http://localhost:3000/bookingHistory");
            const bookingHistory = await bookingHistoryResponse.json();
    
            let latestCheckOutTime = null;
            const isSlotBooked = bookingHistory.some((booking) => {
                if (booking.slot === selectedSlot && booking.parkingStation === selectedParkingStation) {
                    const existingStart = new Date(`${booking.checkInDate}T${booking.checkInTime}`);
                    const existingEnd = new Date(`${booking.checkOutDate}T${booking.checkOutTime}`);
    
                    // Track latest check-out time
                    if (!latestCheckOutTime || existingEnd > latestCheckOutTime) {
                        latestCheckOutTime = existingEnd;
                    }
    
                    // Check if time overlaps
                    return (
                        (newBookingStart >= existingStart && newBookingStart < existingEnd) || // New booking starts within existing booking
                        (newBookingEnd > existingStart && newBookingEnd <= existingEnd) || // New booking ends within existing booking
                        (newBookingStart <= existingStart && newBookingEnd >= existingEnd) // New booking fully covers an existing booking
                    );
                }
                return false;
            });
    
            if (isSlotBooked) {
                const formattedAvailability = latestCheckOutTime
                    ? `The slot will be available after ${latestCheckOutTime.toLocaleDateString()} at ${latestCheckOutTime.toLocaleTimeString()}`
                    : "Please check for another time.";
    
                setBookingMessage(
                    `The selected slot is already booked during this time. ${formattedAvailability}`
                );
                return;
            }
    
            // Calculate total price
            const bookingDurationHours = Math.ceil((newBookingEnd - newBookingStart) / (1000 * 60 * 60));
            const totalPrice = slotPrice * bookingDurationHours;
    
            // Add totalPrice and status to booking details
            bookingDetails.totalPrice = totalPrice;
            bookingDetails.status = "Pending";
            bookingDetails.payment = "Pending";
            bookingDetails.CheckedIn = false;
            bookingDetails.CheckedOut = false;
    
            // Proceed with booking
            await fetch("http://localhost:3000/bookingHistory", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingDetails),
            });
    
            setBookingMessage(
                <p className="successPara">
                    Booking Successful! Total Price: <span className="successSpan">₹{totalPrice}</span> (for <span className="successSpan">{bookingDurationHours}</span> hours at <span className="successSpan">₹{slotPrice}/hour</span>).
                </p>
            );
        } catch (error) {
            console.error("Error during booking:", error);
            setBookingMessage("An error occurred while processing the booking. Please try again later.");
        }
    };
    
    
    
    useEffect(() => {
        getLocation();
    }, []);

    const isBookingReady =
        selectedCity &&
        selectedParkingStation &&
        selectedSlot &&
        checkInDate &&
        checkOutDate &&
        checkInTime &&
        checkOutTime;

    return (
        <div className="bookNowDetailsConatainer">
            <h1 className="head7">Book Now</h1>
            <div className="bookingSelectionContainer">
                <div className="selectLocationContainer">
                    <h3 className="head8">Select City</h3>
                    <select
                        name="city"
                        id="city"
                        onChange={handleCityChange}
                        className="bookingSelectEl"
                    >
                        <option value="" className="bookNowOptions">-- Select a City --</option>
                        {cityLocations.map((city, index) => (
                            <option key={index} value={city.city} className="bookNowOptions">
                                {city.city}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedCity && (
                    <div className="selectLocationContainer">
                        <h3 className="head8">Select Parking Station</h3>
                        <select
                            name="parkingStation"
                            id="parkingStation"
                            onChange={handleParkingStationChange}
                            className="bookingSelectEl"
                        >
                            <option value="" className="bookNowOptions">-- Select a Parking Station --</option>
                            {parkingStations.map((station, index) => (
                                <option key={index} value={station.name} className="bookNowOptions">
                                    {station.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                {selectedParkingStation && (
                    <div className="selectLocationContainer">
                        <h3 className="head9">Select Slot</h3>
                        <select
                            name="slot"
                            id="slot"
                            onChange={handleSlotChange}
                            className="bookingSelectEl"
                        >
                            <option value="" className="bookNowOptions">-- Select a Slot --</option>
                            {parkingSlots.map((slot, index) => (
                                <option key={index} value={slot.slotNumber} className="bookNowOptions">
                                    Slot {slot.slotNumber} - ₹{slot.price}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                {selectedSlot && (
                    <div className="dateMainContainer">
                        <div className="dateSelectionContainer">
                            <h3 className="head8">Select Check-In Date</h3>
                            <input
                                type="date"
                                name="checkInDate"
                                value={checkInDate}
                                onChange={handleCheckInDateChange}
                                className="bookingSelectEl"
                            />
                        </div>
                        <div className="dateSelectionContainer">
                            <h3 className="head9">Select Check-In Time</h3>
                            <input
                                type="time"
                                name="checkInTime"
                                value={checkInTime}
                                onChange={handleCheckInTimeChange}
                                className="bookingSelectEl"
                            />
                        </div>
                        <div className="dateSelectionContainer">
                            <h3 className="head8">Select Check-Out Date</h3>
                            <input
                                type="date"
                                name="checkOutDate"
                                value={checkOutDate}
                                onChange={handleCheckOutDateChange}
                                className="bookingSelectEl"
                            />
                        </div>
                        <div className="dateSelectionContainer">
                            <h3 className="head9">Select Check-Out Time</h3>
                            <input
                                type="time"
                                name="checkOutTime"
                                value={checkOutTime}
                                onChange={handleCheckOutTimeChange}
                                className="bookingSelectEl"
                            />
                        </div>
                    </div>
                )}
            </div>
            {isBookingReady && (
                <button onClick={handleBooking} className="bookNowButton">
                    Book Now
                </button>
            )}
            {bookingMessage && (
                <div className="bookingMessageContainer">
                    <p>{bookingMessage}</p>
                    {bookingMessage === "Booking Successful!" && (
                        <button
                            onClick={handleNewBooking}
                            className="newBookingButton"
                        >
                            New Booking
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default BookNowPage;
