
import { Link, useNavigate } from "react-router-dom";
import React, { useState , useEffect} from "react";

const AdminNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const username=localStorage.getItem("username");

    const navigate = useNavigate();
        useEffect(() => {
            const fetchUserDetails = async () => {
                try {
                    const response = await fetch("http://localhost:3000/adminDetails");
                    const users = await response.json();
    
                    // Find user by username
                    const currentUser = users.find(user => user.username === username);
                    if (currentUser) {
                        setUserDetails(currentUser);
                    }
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            };
    
            if (username) {
                fetchUserDetails();
            }
        }, [username]);

    const onLogout = () => {
        localStorage.removeItem("isAdmin"); 
        navigate("/AdminLogin"); 
    };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <h1 className="head3">
                Park <span className="King">King</span>
            </h1>
            <button className="hamburger" onClick={toggleMenu}>
                ☰
            </button>
            <ul className={`secondNav ${isMenuOpen ? "openMenu" : "closeMenu"}`}>
                <Link to="/AdminDashboard">
                    <li className="listItem1">Dashboard</li>
                </Link>
                <Link to="/UserManagement">
                    <li className="listItem1">User Management</li>
                </Link>
                <Link to="/ManagerManagement">
                    <li className="listItem1">Manager Management</li>
                </Link>
                <Link to="/ParkingStationManagement">
                    <li className="listItem1">Parking Station Management</li>
                </Link>
                <Link to="/BookingHistoryAdmin">
                    <li className="listItem1">Booking History</li>
                </Link>
                <Link to="/ManageComplainAdmin">
                    <li className="listItem1">Manage Complain</li>
                </Link>
                <Link to="/ManageReview">
                    <li className="listItem1">Manage Review</li>
                </Link>
                <Link to="/ContactRequest">
                    <li className="listItem1">Contact Request</li>
                </Link>
                <Link to="/ManageAdmins">
                    <li className="listItem1">Manage Admins</li>
                </Link>
                <button onClick={onLogout} className="btn2">Logout</button>
            </ul>
        </nav>
    );
};

export default AdminNavbar;
