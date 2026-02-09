import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const WaterResources = () => {
  const [city, setCity] = useState("");
  const [waterData, setWaterData] = useState([]);
  const [error, setError] = useState("");

  const handleBtnclick = async () => {
    setError("");
    setWaterData([]);

    try {
      const geoRes = await axios.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        {
          params: {
            name: city,
            count: 1,
          },
        }
      );

      if (!geoRes.data.results || geoRes.data.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude } = geoRes.data.results[0];

      const overpassQuery = `
        [out:json];
        (
          node["natural"="water"](around:15000,${latitude},${longitude});
          way["waterway"="river"](around:15000,${latitude},${longitude});
          way["natural"="water"](around:15000,${latitude},${longitude});
        );
        out center;
      `;

      const waterRes = await axios.post(
        "https://overpass-api.de/api/interpreter",
        overpassQuery,
        { headers: { "Content-Type": "text/plain" } }
      );

      setWaterData(waterRes.data.elements);
    } catch (err) {
      setError("Unable to fetch water resources.");
      console.error(err);
    }
  };

  return (
    <div className="page-container water-bg">

      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">💧 Water Resource Finder</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/temperature">Weather</Link>
          <Link to="/population">Population</Link>
          <Link to="/education">Education</Link>
          <Link to="/water" className="active">Water</Link>
          <Link to="/food">Food</Link>
        </div>
      </nav>

      {/* Card */}
      <div className="content-card wide-card">
        <h1>🌊 Water Resources</h1>
        <p>Discover rivers, lakes, and water bodies near a city.</p>

        <input
          type="text"
          placeholder="Enter city name"
          className="city-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button className="action-btn" onClick={handleBtnclick}>
          Get Water Resources
        </button>

        {error && <p className="error-text">{error}</p>}

        {waterData.length > 0 && (
          <div className="table-wrapper">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                </tr>
              </thead>
              <tbody>
                {waterData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.tags?.name || "N/A"}</td>
                    <td>
                      {item.tags?.waterway ||
                        item.tags?.natural ||
                        "Water Body"}
                    </td>
                    <td>{item.lat || item.center?.lat}</td>
                    <td>{item.lon || item.center?.lon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default WaterResources;