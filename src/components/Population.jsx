import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const Population = () => {
  const [city, setCity] = useState("");
  const [population, setPopulation] = useState(null);
  const [error, setError] = useState("");

  const handleBtnclick = () => {
    setError("");
    setPopulation(null);

    axios
      .get("https://geocoding-api.open-meteo.com/v1/search", {
        params: {
          name: city,
          count: 1,
        },
      })
      .then((res) => {
        if (!res.data.results || res.data.results.length === 0) {
          throw new Error("City not found");
        }

        const { population } = res.data.results[0];
        setPopulation(population);
      })
      .catch((err) => {
        setError("Unable to fetch population. Try again.");
        console.error(err);
      });
  };

  return (
    <div className="page-container">

      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">🌍 City Info Portal</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/temperature">Weather</Link>
          <Link to="/population" className="active">Population</Link>
          <Link to="/education">Education</Link>
          <Link to="/water">Water</Link>
          <Link to="/food">Food</Link>
        </div>
      </nav>

      {/* Content Card */}
      <div className="content-card">
        <h1>🏙️ Population Checker</h1>
        <p>Enter a city name to get its population using live API data.</p>

        <input
          type="text"
          placeholder="Enter city name"
          className="city-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button className="action-btn" onClick={handleBtnclick}>
          Check Population
        </button>

        {population && (
          <div className="result-card">
            <h2>
              Population of <span>{city}</span>
            </h2>
            <h1>{population.toLocaleString()}</h1>
          </div>
        )}

        {error && <p className="error-text">{error}</p>}
      </div>

    </div>
  );
};

export default Population;