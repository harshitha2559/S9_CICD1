import { Link } from "react-router-dom";
import "./styles.css";

function Master() {
  return (
    <div className="home-container">
      
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">🌍 City Info Portal</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/temperature">Weather</Link>
          <Link to="/population">Population</Link>
          <Link to="/education">Education</Link>
          <Link to="/water">Water</Link>
          <Link to="/food">Food</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-card">
        <h1>Welcome 👋</h1>
        <p>
          Explore city details using live APIs powered by <b>Axios</b>.
          <br />
          Get information about weather, population, education, water resources, and food places.
        </p>

        <div className="button-group">
          <Link to="/temperature" className="primary-btn">Start Exploring</Link>
        </div>
      </div>

    </div>
  );
}

export default Master;

