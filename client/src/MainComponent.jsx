import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MainComponent.css';
import bantayImage from './assets/bantay.png'; // Adjust the path as necessary

const MainComponent = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('api/users/all');
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users.');
      }
    };

    fetchUsers();
  }, []);

  const handleAddData = () => {
    navigate('/registration');
  };

  const handleClearAllData = async () => {
    try {
      await axios.delete('api/clear-data');
      setUsers([]);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('username');
      navigate('/login');
    } catch (err) {
      console.error('Error clearing data:', err);
      setError('Failed to clear data.');
    }
  };

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortConfig !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const getShiftColor = (shift) => {
    switch (shift) {
      case 'MORNING':
        return '#87ceeb';
      case 'MID':
        return '#ffa500';
      case 'NIGHT':
        return '#9400d3';
      default:
        return 'transparent';
    }
  };

  const getTeamColor = (team) => {
    switch (team) {
      case 'A1':
        return '#ff7f7f';
      case 'A2':
        return '#7fffd4';
      case 'B1':
        return '#ffdf00';
      case 'B2':
        return '#add8e6';
      case 'B3':
        return '#90ee90';
      default:
        return 'transparent';
    }
  };

  return (
    <div className="main-container">
      {/* Header Container */}
      <div
    className="header-container"
    style={{
      margin: '200px 0 30px 0', // Set top margin to 200px
      backgroundImage: `url(${bantayImage})`, // Set the image as the background
      backgroundSize: 'cover', // Cover the entire area
      backgroundPosition: 'center', // Emphasize the lower part of the image
      color: 'white',
      textAlign: 'center',
      padding: '20px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px', // Height of the header
      borderRadius: '50px', // Round corners
      overflow: 'hidden', // Hide overflow if needed
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.7)', // Add black shadow
    }}
  >
  </div>

      <div className="content">
        <div className="table-container">
          <h1>Shift Rotation Schedule</h1>

          <div className="table-buttons">
            <button onClick={handleAddData}>Add Data</button>
            <button onClick={handleClearAllData} style={{ marginLeft: '10px' }}>Clear All Data</button>
          </div>

          {error && <p className="error">{error}</p>}

          <table>
            <thead>
              <tr>
                <th onClick={() => requestSort('id')}>ID</th>
                <th onClick={() => requestSort('username')}>Username</th>
                <th onClick={() => requestSort('shift')}>Shift</th>
                <th onClick={() => requestSort('team')}>Team</th>
                <th onClick={() => requestSort('created_at')}>Created At</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td style={{ backgroundColor: getShiftColor(user.shift) }}>{user.shift}</td>
                  <td style={{ backgroundColor: getTeamColor(user.team) }}>{user.team}</td>
                  <td>{new Date(user.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend Section */}
        <div className="legend-container">
          <h2>Legend</h2>
          <h2 className="legend-title">Shift Colors</h2>
          <ul className="legend">
            <li><span className="color-box morning"></span> Morning (6am - 3pm)</li>
            <li><span className="color-box mid"></span> Mid (2pm - 10pm)</li>
            <li><span className="color-box night"></span> Night (10pm - 7am)</li>
          </ul>

          <h2 className="legend-title">Team Colors</h2>
          <ul className="legend">
            <li><span className="color-box" style={{ backgroundColor: '#ff7f7f' }}></span> Team A1</li>
            <li><span className="color-box" style={{ backgroundColor: '#7fffd4' }}></span> Team A2</li>
            <li><span className="color-box" style={{ backgroundColor: '#ffdf00' }}></span> Team B1</li>
            <li><span className="color-box" style={{ backgroundColor: '#add8e6' }}></span> Team B2</li>
            <li><span className="color-box" style={{ backgroundColor: '#90ee90' }}></span> Team B3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
