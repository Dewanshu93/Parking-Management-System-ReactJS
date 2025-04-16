import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ManagerNavbar.css";

const ManagerNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const onLogout = async () => {
        try {
            const response = await fetch("http://localhost:3000/managers");
            const managers = await response.json();
    
            // Find the logged-in manager
            const loggedInManager = managers.find((manager) => manager.isLoggedIn);
    
            if (loggedInManager) {
                // Update isLoggedIn to false
                await fetch(`http://localhost:3000/managers/${loggedInManager.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ isLoggedIn: false }),
                });
    
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("managerUsername");
                navigate("/login");
            } else {
                console.error("No manager is currently logged in.");
                navigate("/login");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };
    

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <h1 className="head3">
                Park <span className="King">King</span>
            </h1>
            {/* Hamburger icon */}
            <button className="hamburger" onClick={toggleMenu}>
                ☰
            </button>
            {/* Menu Items */}
            <ul className={`secondNav ${isMenuOpen ? "openMenu" : "closeMenu"}`}>
                <Link to="/ManagerDashboard">
                    <li className="listItem1">Home</li>
                </Link>
                <Link to="/ManageEmployeeDashboard">
                    <li className="listItem1">Employee</li>
                </Link>
                <Link to="/ManageComplain">
                    <li className="listItem1">Manage Complain</li>
                </Link>
                <Link to="/PastBooking">
                    <li className="listItem1">Past Booking</li>
                </Link>
                <button onClick={onLogout} className="btn2">Logout</button>
            </ul>
        </nav>
    );
};

export default ManagerNavbar;
