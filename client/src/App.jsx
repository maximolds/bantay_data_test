import { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import About from "./About";
import LoginComponent from "./LoginComponent";
import RegistrationComponent from "./RegistrationComponent";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import MainComponent from "./MainComponent";

function App() {
  return (
    <Router>
      <Fragment>
        <header className="header">
          <div>Bantay Data WebAPP</div>
          <Link to="/registration">Register</Link>
        </header>
        <div className="main">
        <Routes>
   {/* Public routes */}
   <Route path="/login" element={<LoginComponent />} />
   <Route path="/registration" element={<RegistrationComponent />} />
   
   {/* Protected routes */}
   <Route element={<ProtectedRoutes />}>
     <Route path="/" element={<MainComponent />} />
     <Route path="/about" element={<About />} />
   </Route>
</Routes>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
