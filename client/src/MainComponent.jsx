import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation


const MainComponent = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate for logout

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('api/users/all');
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  // Handle logout function
  const handleLogout = () => {
    // Clear localStorage upon logout
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");

    // Redirect to the login page
    navigate("/login");
  };

  // Handle clear all data function
  const handleClearAllData = async () => {
    try {
      await axios.delete('api/clear-data'); // Call backend route to clear data
      setUsers([]); // Clear users from state after successful deletion
      localStorage.removeItem("isAuthenticated"); // Remove authentication status
      localStorage.removeItem("username"); // Remove username from local storage
      navigate("/login"); // Navigate to login after clearing data
    } catch (err) {
      console.error("Error clearing data:", err);
      setError("Failed to clear data.");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Navbar */}
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/about" style={{ marginRight: '10px' }}>About Us</Link>
        <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
          Logout
        </button>
        <button onClick={handleClearAllData} style={{ marginLeft: '10px' }}>
          Clear All Data
        </button>
      </nav>

      <h1>Users List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>ID</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Username</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Shift</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Team</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{user.id}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{user.username}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{user.shift}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{user.team}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{new Date(user.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainComponent;
