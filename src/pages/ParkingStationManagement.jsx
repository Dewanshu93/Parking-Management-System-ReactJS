import React, { useState, useEffect } from "react";
import "../styles/ParkingStationManagement.css";
import AdminNavbar from "../components/AdminNavbar";

const ParkingStationManagement = () => {
  const [cityLocations, setCityLocations] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [newStation, setNewStation] = useState({ name: "", slots: [] });
  const [newSlot, setNewSlot] = useState({ slotNumber: "", price: "" });
  const [editingSlot, setEditingSlot] = useState(null);
  const [editedPrice, setEditedPrice] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/cityLocations")
      .then((response) => response.json())
      .then((data) => setCityLocations(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCityChange = (e) => setSelectedCity(e.target.value);

  const addParkingStation = () => {
    if (!selectedCity || !newStation.name) return;
    const updatedCities = cityLocations.map((city) =>
      city.city === selectedCity
        ? { ...city, parkingStations: [...city.parkingStations, newStation] }
        : city
    );
    setCityLocations(updatedCities);
    setNewStation({ name: "", slots: [] });
  };

  const deleteParkingStation = (stationName) => {
    const updatedCities = cityLocations.map((city) =>
      city.city === selectedCity
        ? {
            ...city,
            parkingStations: city.parkingStations.filter(
              (station) => station.name !== stationName
            ),
          }
        : city
    );
    setCityLocations(updatedCities);
  };

  const addSlot = (stationName) => {
    if (!newSlot.slotNumber || !newSlot.price) return;
    const updatedCities = cityLocations.map((city) =>
      city.city === selectedCity
        ? {
            ...city,
            parkingStations: city.parkingStations.map((station) =>
              station.name === stationName
                ? {
                    ...station,
                    slots: [...station.slots, { ...newSlot }],
                  }
                : station
            ),
          }
        : city
    );
    setCityLocations(updatedCities);
    setNewSlot({ slotNumber: "", price: "" });
  };

  const removeSlot = (stationName, slotNumber) => {
    const updatedCities = cityLocations.map((city) =>
      city.city === selectedCity
        ? {
            ...city,
            parkingStations: city.parkingStations.map((station) =>
              station.name === stationName
                ? {
                    ...station,
                    slots: station.slots.filter((slot) => slot.slotNumber !== slotNumber),
                  }
                : station
            ),
          }
        : city
    );
    setCityLocations(updatedCities);
  };

  const editSlotPrice = (slotNumber, price) => {
    setEditingSlot(slotNumber);
    setEditedPrice(price);
  };

  const saveSlotPrice = (stationName, slotNumber) => {
    const updatedCities = cityLocations.map((city) =>
      city.city === selectedCity
        ? {
            ...city,
            parkingStations: city.parkingStations.map((station) =>
              station.name === stationName
                ? {
                    ...station,
                    slots: station.slots.map((slot) =>
                      slot.slotNumber === slotNumber
                        ? { ...slot, price: editedPrice }
                        : slot
                    ),
                  }
                : station
            ),
          }
        : city
    );
    setCityLocations(updatedCities);
    setEditingSlot(null);
    setEditedPrice("");
  };

  return (
    <div className="parkingStationManagement">
      <AdminNavbar />
      <div className="parkingStationManagementContainer">
      <h1 className="parkingManagementHead">Parking Station Management</h1>
        <div className="parkingStationManagementInputContainer">
        <select onChange={handleCityChange} value={selectedCity} className="selectCity">
          <option value=""  className="selectCityOption">Select a City</option>
          {cityLocations.map((city) => (
            <option key={city.id} value={city.city} className="selectCityOption">
              {city.city}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="New Parking Station Name"
          value={newStation.name}
          onChange={(e) => setNewStation({ ...newStation, name: e.target.value })}
          className="newParkingStationInput"
        />
        <button onClick={addParkingStation} className="parkingStationManagementButton">Add Parking Station</button>

        {selectedCity && (
          <div className="parkingStationsContainer">
            <h2>Parking Stations in {selectedCity}</h2>
            {cityLocations
              .find((city) => city.city === selectedCity)
              ?.parkingStations.map((station) => (
                <div key={station.name} className="parkingSStationCard">
                  <h3 className="parkingStationNameHead">{station.name}</h3>
                  <button onClick={() => deleteParkingStation(station.name)} className="parkingStationManagementButton">Delete</button>

                  <h4 className="slotHead">Slots:</h4>
                  <div className="slotMainConatainer">
                  {station.slots.map((slot) => (
                    <div key={slot.slotNumber} className="slotContainer">
                      {editingSlot === slot.slotNumber ? (
                        <input
                          type="number"
                          value={editedPrice}
                          onChange={(e) => setEditedPrice(e.target.value)}
                          className="slotPriceEditInput"
                        />
                      ) : (
                        <p className="slotNumber">
                          Slot {slot.slotNumber}: ${slot.price}
                        </p>
                      )}
                      {editingSlot === slot.slotNumber ? (
                        <button onClick={() => saveSlotPrice(station.name, slot.slotNumber)} className="parkingStationManagementButton">
                          Save
                        </button>
                      ) : (
                        <button onClick={() => editSlotPrice(slot.slotNumber, slot.price)} className="parkingStationManagementButton">
                          Edit Price
                        </button>
                      )}
                      <button onClick={() => removeSlot(station.name, slot.slotNumber)} className="parkingStationManagementButton">
                        Remove Slot
                      </button>
                    </div>
                  ))}
                  </div>

                  <div className="addSlotInputCOntainer">
                  <input
                    type="number"
                    placeholder="Slot Number"
                    value={newSlot.slotNumber}
                    onChange={(e) =>
                      setNewSlot({ ...newSlot, slotNumber: e.target.value })
                    }
                    className="slotDetailInput"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={newSlot.price}
                    onChange={(e) => setNewSlot({ ...newSlot, price: e.target.value })}
                    className="slotDetailInput"
                  />
                  </div>
                  <button onClick={() => addSlot(station.name)} className="addSlotButton">Add Slot</button>
                </div>
              ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default ParkingStationManagement;
