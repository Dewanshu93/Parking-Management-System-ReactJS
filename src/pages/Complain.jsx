import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/BookNowPage.css";
import Navbar from "../components/Navbar";

const Complain = () => {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [parkingStations, setParkingStations] = useState([]);
    const [selectedParkingStation, setSelectedParkingStation] = useState("");
    const [employees, setEmployees] = useState([]);
    const [slots, setSlots] = useState([]);
    const [selectedEntity, setSelectedEntity] = useState(""); // Either "employee" or "slot"
    const [complainAgainst, setComplainAgainst] = useState(""); // Selected employee or slot
    const [description, setDescription] = useState("");

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch("http://localhost:3000/cityLocations");
                const data = await response.json();
                setCities(data);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };

        fetchCities();
    }, []);

    const handleCityChange = (city) => {
        setSelectedCity(city);
        const cityData = cities.find((c) => c.city === city);
        setParkingStations(cityData ? cityData.parkingStations : []);
        setSelectedParkingStation("");
        setEmployees([]);
        setSlots([]);
    };

    const handleParkingStationChange = (stationName) => {
        setSelectedParkingStation(stationName);
        const stationData = parkingStations.find((station) => station.name === stationName);
        setEmployees(stationData ? stationData.employees : []);
        setSlots(stationData ? stationData.slots : []);
        setSelectedEntity("");
        setComplainAgainst("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedCity || !selectedParkingStation || !selectedEntity || !complainAgainst || !description) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const newComplain = {
            city: selectedCity,
            parkingStation: selectedParkingStation,
            type: selectedEntity, // "employee" or "slot"
            complainAgainst,
            description,
            status: "Not Resolved",
        };

        try {
            const response = await fetch("http://localhost:3000/complains", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newComplain),
            });

            if (response.ok) {
                toast.success("Complain submitted successfully!");
                setSelectedCity("");
                setParkingStations([]);
                setSelectedParkingStation("");
                setEmployees([]);
                setSlots([]);
                setSelectedEntity("");
                setComplainAgainst("");
                setDescription("");
            } else {
                toast.error("Failed to submit complain. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting complain:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="complainContainer">
            <Navbar />
            <ToastContainer /> {/* Ensure ToastContainer is here for toasts to work */}
            <div className="complainMainContainer">
                <h1 className="complainHeader">Raise a Complain</h1>
                <form onSubmit={handleSubmit} className="complainForm">
                    {/* City Selection */}
                    <div className="selectionConatiner">
                        <label className="complainLabel">Select City:</label>
                        <select
                            value={selectedCity}
                            onChange={(e) => handleCityChange(e.target.value)}
                            className="dropdown"
                        >
                            <option value="">-- Select City --</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.city}>
                                    {city.city}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Parking Station Selection */}
                    {parkingStations.length > 0 && (
                        <div>
                            <label className="complainLabel">Select Parking Station:</label>
                            <select
                                value={selectedParkingStation}
                                onChange={(e) => handleParkingStationChange(e.target.value)}
                                className="dropdown"
                            >
                                <option value="">-- Select Parking Station --</option>
                                {parkingStations.map((station, index) => (
                                    <option key={index} value={station.name}>
                                        {station.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Entity Selection */}
                    {employees.length > 0 && slots.length > 0 && (
                        <div>
                            <label className="complainLabel">Complain Against:</label>
                            <select
                                value={selectedEntity}
                                onChange={(e) => setSelectedEntity(e.target.value)}
                                className="dropdown"
                            >
                                <option value="">-- Select Entity --</option>
                                <option value="employee">Employee</option>
                                <option value="slot">Parking Slot</option>
                            </select>
                        </div>
                    )}

                    {/* Employees or Slots */}
                    {selectedEntity === "employee" && (
                        <div>
                            <label className="complainLabel">Select Employee:</label>
                            <select
                                value={complainAgainst}
                                onChange={(e) => setComplainAgainst(e.target.value)}
                                className="dropdown"
                            >
                                <option value="">-- Select Employee --</option>
                                {employees.map((employee, index) => (
                                    <option key={index} value={employee.name}>
                                        {employee.name} - {employee.role}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {selectedEntity === "slot" && (
                        <div>
                            <label className="complainLabel">Select Slot:</label>
                            <select
                                value={complainAgainst}
                                onChange={(e) => setComplainAgainst(e.target.value)}
                                className="dropdown"
                            >
                                <option value="">-- Select Slot --</option>
                                {slots.map((slot, index) => (
                                    <option key={index} value={`Slot ${slot.slotNumber}`}>
                                        Slot {slot.slotNumber} - ₹{slot.price}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Complain Description */}
                    {selectedEntity && complainAgainst && (
                        <div>
                            <label className="complainLabel">Complain Description:</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="textarea"
                                placeholder="Write your complain here..."
                            ></textarea>
                        </div>
                    )}

                    {/* Submit Button */}
                    {selectedEntity && complainAgainst && description && (
                        <button type="submit" className="submitButton">
                            Submit Complain
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Complain;
