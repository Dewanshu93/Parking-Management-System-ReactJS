import React, { useState, useEffect } from "react";
import "./ManageAdmins.css"
import AdminNavbar from "../AdminNavbar/AdminNavbar";

function ManageAdmins() {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ username: "", password: "" });
  const [editingAdmin, setEditingAdmin] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/adminDetails")
      .then((response) => response.json())
      .then((data) => setAdmins(data))
      .catch((error) => console.error("Error fetching admins:", error));
  }, []);

  const handleAddAdmin = async () => {
    if (!newAdmin.username || !newAdmin.password) return;

    const newAdminData = { ...newAdmin, id: Date.now().toString() };
    
    const response = await fetch("http://localhost:3000/adminDetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAdminData),
    });

    if (response.ok) {
      setAdmins([...admins, newAdminData]);
      setNewAdmin({ username: "", password: "" });
    }
  };

  const handleEditAdmin = async (id) => {
    const updatedAdmins = admins.map((admin) =>
      admin.id === id ? editingAdmin : admin
    );

    const response = await fetch(`http://localhost:3000/adminDetails/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingAdmin),
    });

    if (response.ok) {
      setAdmins(updatedAdmins);
      setEditingAdmin(null);
    }
  };

  const handleDeleteAdmin = async (id) => {
    const response = await fetch(`http://localhost:3000/adminDetails/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setAdmins(admins.filter((admin) => admin.id !== id));
    }
  };

  return (
    <div className="manageAdmins">
        <AdminNavbar/>
      <div className="manageAdminsMainContainer">
      <h2 className="manageAdminsMainHead">Manage Admins</h2>
    <div className="manageAdminsCardContainer">
        <h3>Add New Admin</h3>
        <input
            type="text"
            placeholder="Username"
            value={newAdmin.username}
            onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
        />
        <input
            type="password"
            placeholder="Password"
            value={newAdmin.password}
            onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
        />
    <button onClick={handleAddAdmin}>Add Admin</button>
    </div>
    <div className="manageAdminsListContainer">
        <h3>Admin List</h3>
        <ul className="manageAdminsList">
        {admins.map((admin) => (
            <li key={admin.id} className="manageAdminsListData">
            {editingAdmin?.id === admin.id ? (
                <>
                <input
                    type="text"
                    value={editingAdmin.username}
                    onChange={(e) =>
                    setEditingAdmin({ ...editingAdmin, username: e.target.value })
                    }
                />
                <input
                    type="password"
                    value={editingAdmin.password}
                    onChange={(e) =>
                    setEditingAdmin({ ...editingAdmin, password: e.target.value })
                    }
                />
                <button onClick={() => handleEditAdmin(admin.id)}>Save</button>
                </>
            ) : (
                <>
                {admin.username} 
                <button onClick={() => setEditingAdmin(admin)}>Edit</button>
                <button onClick={() => handleDeleteAdmin(admin.id)}>Delete</button>
                </>
            )}
            </li>
        ))}
        </ul>
    </div>
    </div>
    </div>
  );
}

export default ManageAdmins;
