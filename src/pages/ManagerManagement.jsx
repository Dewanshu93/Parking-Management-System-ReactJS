import React, { useState, useEffect } from 'react';
import "../styles/ManagerManagement.css";
import AdminNavbar from '../components/AdminNavbar';

function ManagerManagement() {
  const [managers, setManagers] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    city: '',
    parkingStationName: '',
  });
  const [editingId, setEditingId] = useState(null); // Track which manager is being edited

  // Fetch data from db.JSON
  useEffect(() => {
    fetch('http://localhost:3000/managers')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Data:', data);
        if (Array.isArray(data)) {
          setManagers(data);
        } else {
          console.error('Invalid API response:', data);
        }
      })
      .catch((err) => console.error('Error fetching managers:', err));
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add a new manager
  const addManager = () => {
    if (!formData.username || !formData.city || !formData.parkingStationName) {
      alert("Please fill in all fields!");
      return;
    }
    const newManager = {
      id: Date.now().toString(),
      ...formData,
      isLoggedIn: false,
    };

    // Send POST request to add new manager
    fetch('http://localhost:3000/managers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newManager),
    })
      .then(() => {
        setManagers([...managers, newManager]);
        setFormData({ username: '', password: '', city: '', parkingStationName: '' });
      })
      .catch((err) => console.error('Error adding manager:', err));
  };

  // Set formData with existing manager details when clicking "Edit"
  const editManager = (id) => {
    const managerToEdit = managers.find(manager => manager.id === id);
    if (managerToEdit) {
      setFormData({
        username: managerToEdit.username,
        password: '', // Keep password empty for security
        city: managerToEdit.city,
        parkingStationName: managerToEdit.parkingStationName,
      });
      setEditingId(id); // Track manager being edited
    }
  };

  // Save edited manager (PUT request)
  const saveEditedManager = () => {
    if (!editingId) return;
    
    const updatedManager = {
      ...formData,
      id: editingId,
    };

    fetch(`http://localhost:3000/managers/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedManager),
    })
      .then(() => {
        setManagers(managers.map(mgr => (mgr.id === editingId ? updatedManager : mgr)));
        setEditingId(null);
        setFormData({ username: '', password: '', city: '', parkingStationName: '' });
      })
      .catch((err) => console.error('Error updating manager:', err));
  };

  // Remove a manager (DELETE request)
  const removeManager = (id) => {
    fetch(`http://localhost:3000/managers/${id}`, { method: 'DELETE' })
      .then(() => {
        setManagers(managers.filter(manager => manager.id !== id));
      })
      .catch((err) => console.error('Error removing manager:', err));
  };

  return (
    <div className='managerManagement'>
      <AdminNavbar />
      <div className='managerManagementContainer'>
        <h1 className='managerManagementHead'>Manager Management</h1>
        
        {/* Form for Adding/Editing Managers */}
        <div className='managerManagementInputContainer'>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className='managerManagementInput'
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className='managerManagementInput'
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            className='managerManagementInput'
          />
          <input
            type="text"
            name="parkingStationName"
            placeholder="Parking Station Name"
            value={formData.parkingStationName}
            onChange={handleInputChange}
            className='managerManagementInput'
          />
          {editingId ? (
            <button onClick={saveEditedManager}>Save Changes</button>
          ) : (
            <button onClick={addManager}>Add Manager</button>
          )}
        </div>

        {/* Manager List Table */}
        <table border="1" className='managerManagementTable'>
          <thead>
            <tr>
              <th className='managerManagementRow'>Username</th>
              <th className='managerManagementRow'>City</th>
              <th className='managerManagementRow'>Parking Station</th>
              <th className='managerManagementRow'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {managers && managers.map((manager) => (
              <tr key={manager.id}>
                <td className='managerManagementRow'>{manager.username}</td>
                <td className='managerManagementRow'>{manager.city}</td>
                <td className='managerManagementRow'>{manager.parkingStationName}</td>
                <td className='managerManagementRowButtonContainer'>
                  <button onClick={() => editManager(manager.id)}>Edit</button>
                  <button onClick={() => removeManager(manager.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManagerManagement;
