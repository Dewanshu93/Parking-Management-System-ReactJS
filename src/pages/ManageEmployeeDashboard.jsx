import React, { useState, useEffect } from "react";
import "../styles/ManageEmployeeDashboard.css";
import ManagerNavbar from "../components/ManagerNavbar";

const ManageEmployeeDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [managerParkingStation, setManagerParkingStation] = useState("");
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        name: "",
        role: "",
        contact: "",
    });

    useEffect(() => {
        // Fetch manager info and set the parking station
        const fetchManagerInfo = async () => {
            try {
                const response = await fetch("http://localhost:3000/managers");
                const managers = await response.json();

                const loggedInManager = managers.find((manager) => manager.isLoggedIn);

                if (loggedInManager) {
                    setManagerParkingStation(loggedInManager.parkingStationName);
                }
            } catch (error) {
                console.error("Error fetching manager information:", error);
            }
        };

        fetchManagerInfo();
    }, []);

    useEffect(() => {
        // Fetch employees allocated to the manager's parking station from cityLocations
        const fetchEmployees = async () => {
            try {
                const response = await fetch("http://localhost:3000/cityLocations");
                const cityLocations = await response.json();

                let parkingStationEmployees = [];
                cityLocations.forEach((city) => {
                    const parkingStation = city.parkingStations.find(
                        (station) => station.name === managerParkingStation
                    );
                    if (parkingStation && parkingStation.employees) {
                        parkingStationEmployees = parkingStation.employees;
                    }
                });

                setEmployees(parkingStationEmployees);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };

        if (managerParkingStation) {
            fetchEmployees();
        }
    }, [managerParkingStation]);

    const handleRemoveEmployee = (employeeName) => {
        const updatedEmployees = employees.filter(
            (employee) => employee.name !== employeeName
        );
        setEmployees(updatedEmployees);
        alert(`${employeeName} has been removed successfully.`);
    };

    const handleEditRole = (employeeName, newRole) => {
        const updatedEmployees = employees.map((employee) => {
            if (employee.name === employeeName) {
                return { ...employee, role: newRole };
            }
            return employee;
        });

        setEmployees(updatedEmployees);
        alert(`Role updated for ${employeeName} to ${newRole}.`);
    };

    const handleAddEmployee = () => {
        setShowAddEmployeeModal(true);
    };

    const handleSubmitEmployee = () => {
        if (newEmployee.name && newEmployee.role && newEmployee.contact) {
            setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
            alert(`Employee ${newEmployee.name} has been added successfully.`);
            setShowAddEmployeeModal(false);
            setNewEmployee({ name: "", role: "", contact: "" });
        } else {
            alert("Please fill all the fields.");
        }
    };

    const handleCloseModal = () => {
        setShowAddEmployeeModal(false);
        setNewEmployee({ name: "", role: "", contact: "" });
    };

    return (
        <div className="containerManageEmployee">
            <ManagerNavbar />
            <div className="managerContainer">
                <h1 className="manageEmployeeHeader">Manage Employees</h1>
                <button className="addEmployeeButton" onClick={handleAddEmployee}>
                    Add New Employee
                </button>
                {showAddEmployeeModal && (
                    <div className="addNewEmployeeContainer">
                        <h2>Add New Employee</h2>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={newEmployee.name}
                                    onChange={(e) =>
                                        setNewEmployee({ ...newEmployee, name: e.target.value })
                                    }
                                    className="newEmployeeInput"
                                />
                            </label>
                            <label>
                                Role:
                                <select
                                    value={newEmployee.role}
                                    onChange={(e) =>
                                        setNewEmployee({ ...newEmployee, role: e.target.value })
                                    }
                                    className="newEmployeeInput"
                                >
                                    <option value="">Select Role</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Staff">Staff</option>
                                    <option value="Security">Security</option>
                                </select>
                            </label>
                            <label>
                                Contact:
                                <input
                                    type="text"
                                    value={newEmployee.contact}
                                    onChange={(e) =>
                                        setNewEmployee({
                                            ...newEmployee,
                                            contact: e.target.value,
                                        })
                                    }
                                    className="newEmployeeInput"
                                />
                            </label>
                            <div className="addNewEmployeeButton">
                                <button onClick={handleSubmitEmployee} className="addButton69">Submit</button>
                                <button onClick={handleCloseModal} className="addButton69">Cancel</button>
                            </div>
                    </div>
                )}
                <div className="card-container">
                    {employees.length > 0 ? (
                        employees.map((employee, index) => (
                            <div key={index} className="cardEmployee">
                                <p><strong>Name:</strong> {employee.name}</p>
                                <p><strong>Role:</strong> {employee.role}</p>
                                <p><strong>Contact:</strong> {employee.contact}</p>
                                <div className="button-containerEmployee">
                                    <button
                                        className="button"
                                        onClick={() => handleRemoveEmployee(employee.name)}
                                    >
                                        Remove Employee
                                    </button>
                                    <button
                                        className="button"
                                        onClick={() => {
                                            const newRole = prompt(
                                                `Enter new role for ${employee.name}:`
                                            );
                                            if (newRole) {
                                                handleEditRole(employee.name, newRole);
                                            }
                                        }}
                                    >
                                        Edit Role
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-data">No employees to display.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageEmployeeDashboard;