import React, { useState, useEffect } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar"
import "./AdminDashboard.css"
function AdminDashboard() {
  const [data, setData] = useState({
    totalEmployees: 0,
    totalParkingStations: 0,
    totalSlots: 0,
    citiesCovered: [],
  });

  useEffect(() => {
    console.log(data)
    const fetchData = async () => {
      try {
        // Fetch city locations
        const citiesResponse = await fetch("http://localhost:3000/cityLocations");
        const citiesData = await citiesResponse.json();

        // Initialize counters
        let totalEmployeesCount = 0;
        let totalParkingStationsCount = 0;
        let totalSlotsCount = 0;

        // Process each city's data
        citiesData.forEach((city) => {
          totalParkingStationsCount += city.parkingStations.length; // Count parking stations in each city
          city.parkingStations.forEach((station) => {
            totalEmployeesCount += station.employees.length; // Count employees in each station
            totalSlotsCount += station.slots.length; // Count slots in each station
          });
        });

        // Update state with all metrics
        setData({
          totalEmployees: totalEmployeesCount,
          totalParkingStations: totalParkingStationsCount,
          totalSlots: totalSlotsCount,
          citiesCovered: citiesData.map((city) => city.city),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div className="adminDashboard">
      <AdminNavbar/>
      <div className="adminDashboardMaincontainer">
      <h1>Admin Dashboard</h1>
        <div className="adminDashboardCardConatiner">
        <div className="adminDashboardCard">
          <h3 className="admindashboardHead">Total Employees</h3>
          <p className="admindashboardHead">{data.totalEmployees}</p>
        </div>
        <div className="adminDashboardCard">
          <h3 className="admindashboardHead">Total Parking Stations</h3>
          <p className="admindashboardHead">{data.totalParkingStations}</p>
        </div>
        <div className="adminDashboardCard">
          <h3 className="admindashboardHead">Total Parking Slots</h3>
          <p className="admindashboardHead">{data.totalSlots}</p>
        </div>
        <div className="adminDashboardCard">
          <h3 className="admindashboardHead">Cities Covered</h3>
          <p className="admindashboardHead">{data.citiesCovered.join(", ")}</p>
        </div>
        </div>
      </div>
    </div>
  );
}


export default AdminDashboard;
