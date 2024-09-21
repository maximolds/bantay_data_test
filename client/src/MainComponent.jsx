import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MainComponent.css';

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
        return '#87ceeb'; // Sky blue for morning shift
      case 'MID':
        return '#ffa500'; // Orange for mid shift
      case 'NIGHT':
        return '#9400d3'; // Purple for night shift
      default:
        return 'transparent'; // Default background color
    }
  };

  const getTeamColor = (team) => {
    switch (team) {
      case 'A1':
        return '#ff7f7f'; // Light red for Team 1
      case 'A2':
        return '#7fffd4'; // Aquamarine for Team 2
      case 'B1':
        return '#ffdf00'; // Gold for Team 3
      case 'B2':
        return '#add8e6'; // Light blue for Team 4
      case 'B3':
        return '#90ee90'; // Light green for Team 5
      default:
        return 'transparent'; // Default background color
    }
  };

  return (
    <div className="main-container">
      <div className="content">
        <div className="table-container">
          <h1>Shift Rotation Schedule</h1>
          
          {/* Buttons placed below header and above table */}
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
                  {/* Apply color only to the Shift column */}
                  <td style={{ backgroundColor: getShiftColor(user.shift) }}>{user.shift}</td>
                  {/* Apply color only to the Team column */}
                  <td style={{ backgroundColor: getTeamColor(user.team) }}>{user.team}</td>
                  <td>{new Date(user.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Shift and Team Legend */}
        <div className="calendar-container">
          <h2>Legend</h2>
          <ul className="legend">

          <h3>Shift Colors</h3>
            {/* Shift Legend */}
            <li>
              <span className="color-box morning"></span> Morning (6am - 3pm)
            </li>
            <li>
              <span className="color-box mid"></span> Mid (2pm - 10pm)
            </li>
            <li>
              <span className="color-box night"></span> Night (10pm - 7am)
            </li>
           

            {/* Team Legend */}
            <h3>Team Colors</h3>
            <li>
              <span className="color-box" style={{ backgroundColor: '#ff7f7f' }}></span> Team 1
            </li>
            <li>
              <span className="color-box" style={{ backgroundColor: '#7fffd4' }}></span> Team 2
            </li>
            <li>
              <span className="color-box" style={{ backgroundColor: '#ffdf00' }}></span> Team 3
            </li>
            <li>
              <span className="color-box" style={{ backgroundColor: '#add8e6' }}></span> Team 4
            </li>
            <li>
              <span className="color-box" style={{ backgroundColor: '#90ee90' }}></span> Team 5
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
