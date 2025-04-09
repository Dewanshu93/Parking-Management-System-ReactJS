import React, { useState, useEffect } from "react";
import "./UserManagement.css"
import AdminNavbar from "../AdminNavbar/AdminNavbar";
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    contact: "",
    email: "",
    username: "",
    license: "",
  });

  // Fetch data from db.JSON
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users"); // Replace with your JSON Server URL
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddUser = async () => {
    if (
      newUser.name &&
      newUser.contact &&
      newUser.email &&
      newUser.username &&
      newUser.license
    ) {
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: Date.now().toString(), ...newUser }),
        });
        const addedUser = await response.json();
        setUsers([...users, addedUser]);
        setNewUser({
          name: "",
          contact: "",
          email: "",
          username: "",
          license: "",
        });
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };

  return (
    <div className="adminUserManangement">
        <AdminNavbar/>
      <div className="userManagementConatiner">
      <h2 className="adminUserManagementHeader">Admin User Management</h2>
      <table border="1" className="userManagementMainTable">
        <thead className="userManagementTable">
          <tr>
            <th className="userManagementTable">Name</th>
            <th className="userManagementTable">Contact</th>
            <th className="userManagementTable">Email</th>
            <th className="userManagementTable">Username</th>
            <th className="userManagementTable">License</th>
            <th className="userManagementTable">Actions</th>
          </tr>
        </thead>
        <tbody className="userManagementTable">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="userManagementTable">{user.name}</td>
              <td className="userManagementTable">{user.contact}</td>
              <td className="userManagementTable">{user.email}</td>
              <td className="userManagementTable">{user.username}</td>
              <td className="userManagementTable">{user.license}</td>
              <td className="userManagementTable">
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="addNewUserConatainer">
        <h3 className="addNewUserHead">Add New User</h3>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="addNewUserInput"
        />
        <input
          type="text"
          placeholder="Contact"
          value={newUser.contact}
          onChange={(e) => setNewUser({ ...newUser, contact: e.target.value })}
          className="addNewUserInput"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="addNewUserInput"
        />
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          className="addNewUserInput"
        />
        <input
          type="text"
          placeholder="License"
          value={newUser.license}
          onChange={(e) => setNewUser({ ...newUser, license: e.target.value })}
          className="addNewUserInput"
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      </div>
    </div>
  );
};

export default UserManagement;