import { useState, useEffect } from "react";
import "./App.css"; // Ensure this imports your scoped styles
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from "react-router-dom";
import About from "./About";
import LoginComponent from "./LoginComponent";
import RegistrationComponent from "./RegistrationComponent";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import MainComponent from "./MainComponent";
import logo from "./assets/logo/Untitleddesign.png"; // Import your logo

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State to manage theme
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("isDarkMode");
    return savedMode === "true"; // Default to light mode
  });

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode'; // Apply the theme to the body
  }, [isDarkMode]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <div className="app-root"> {/* Added the scoped class */}
      {location.pathname !== "/login" && (
        <header className="app-header" style={{
          background: isDarkMode 
            ? 'rgba(0, 0, 0, 0.5)' 
            : 'linear-gradient(135deg, rgba(0, 100, 0, 0.8), rgba(0, 0, 0, 0.8))', // Dark green to black gradient for light mode
          boxShadow: isDarkMode ? '0 4px 10px rgba(0, 255, 0, 0.8)' : '0 4px 10px rgba(0, 0, 0, 0.6)',
          color: isDarkMode ? '#ffffff' : '#ffffff', // Text color
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/">
              <img src={logo} alt="Bantay Data Logo" style={{ height: '60px' }} />
            </Link>
            <nav>
              <Link to="/" style={{ margin: '0 10px', color: isDarkMode ? '#ffffff' : '#ffffff' }}>Home</Link>
              <Link to="/about" style={{ margin: '0 10px', color: isDarkMode ? '#ffffff' : '#ffffff' }}>About Us</Link>
              <Link to="/registration" style={{ margin: '0 10px', color: isDarkMode ? '#ffffff' : '#ffffff' }}>Register</Link>
              {isAuthenticated ? (
                <Link to="/" onClick={handleLogout} className="logout" style={{ color: isDarkMode ? '#ffffff' : '#ffffff' }}>Logout</Link>
              ) : (
                <Link to="/login" style={{ color: isDarkMode ? '#ffffff' : '#ffffff' }}>Login</Link>
              )}
              {/* Button to toggle dark mode */}
              <button onClick={() => setIsDarkMode(prev => !prev)} style={{ marginLeft: '10px' }}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </nav>
          </div>
        </header>
      )}
      <div className="main">
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/registration" element={<RegistrationComponent />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<MainComponent />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
