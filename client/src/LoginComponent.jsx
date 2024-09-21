import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link
import "./LoginComponent.css"; // Optional: Add your styles
import logo from "./assets/logo/Untitleddesign.png"; // Import your image

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
    <div className="login-component">
      <h2>
        <img src={logo} alt="Logo" style={{ width: "30px", marginRight: "10px" }} />
        Login
      </h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={handleLogin} className="login-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <div className="register-link">
        <Link to="/registration">Don't have an account? Register here</Link>
      </div>
    </div>
  );
};

export default LoginComponent;
