import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./LoginComponent.css"; // Optional: Add your styles

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/users", { username, password });
      
      if (response.data.working) {
        // Handle successful login
        console.log("Login successful");

        // Store the authentication state and username in localStorage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", username);

        // Redirect to the homepage
        navigate("/"); // You can modify this to navigate to a dashboard or another page
      } else {
        setErrorMessage("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Error logging in. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
