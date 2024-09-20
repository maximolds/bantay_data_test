import React, { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const RegistrationComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [shift, setShift] = useState("");
  const [team, setTeam] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      // Clear messages
      setErrorMessage("");
      setSuccessMessage("");

      try {
        const response = await axios.post("/api/register", {
          username,
          password,
          shift,
          team,
        });

        if (response.data.working) { // Check for successful registration
          setSuccessMessage("Registration successful! You can now log in.");
          navigate("/"); // Redirect to the login page
        } else {
          setErrorMessage("Team limit reached for this shift.");
        }

        // Clear input fields after successful submission
        setUsername("");
        setPassword("");
        setShift("");
        setTeam("");
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("An error occurred during registration.");
        }
      }
    },
    [username, password, shift, team, navigate] // Include navigate in the dependencies
  );

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Shift</label>
          <select value={shift} onChange={(e) => setShift(e.target.value)} required>
            <option value="">Select Shift</option>
            <option value="MORNING">Morning</option>
            <option value="MID">Mid</option>
            <option value="NIGHT">Night</option>
          </select>
        </div>

        <div className="form-group">
          <label>Team</label>
          <select value={team} onChange={(e) => setTeam(e.target.value)} required>
            <option value="">Select Team</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="B3">B3</option>
          </select>
        </div>

        <button type="submit">Register</button>

        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </form>
    </div>
  );
};

export default RegistrationComponent;
