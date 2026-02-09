import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const EducationInstitutions = () => {
  const [city, setCity] = useState("");
  const [institutions, setInstitutions] = useState([]);
  const [error, setError] = useState("");

  const handleBtnclick = async () => {
    setError("");
    setInstitutions([]);

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
          node["amenity"="school"](around:10000,${latitude},${longitude});
          node["amenity"="college"](around:10000,${latitude},${longitude});
          node["amenity"="university"](around:10000,${latitude},${longitude});
        );
        out body;
      `;

      const eduRes = await axios.post(
        "https://overpass-api.de/api/interpreter",
        overpassQuery,
        { headers: { "Content-Type": "text/plain" } }
      );

      setInstitutions(eduRes.data.elements);
    } catch (err) {
      setError("Unable to fetch education institutions.");
      console.error(err);
    }
  };

  return (
    <div className="page-container edu-bg">

      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">🎓 Education Finder</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/temperature">Weather</Link>
          <Link to="/population">Population</Link>
          <Link to="/education" className="active">Education</Link>
          <Link to="/water">Water</Link>
          <Link to="/food">Food</Link>
        </div>
      </nav>

      {/* Card */}
      <div className="content-card wide-card">
        <h1>🏫 Education Institutions</h1>
        <p>Search nearby schools, colleges, and universities by city.</p>

        <input
          type="text"
          placeholder="Enter city name"
          className="city-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button className="action-btn" onClick={handleBtnclick}>
          Get Institutions
        </button>

        {error && <p className="error-text">{error}</p>}

        {institutions.length > 0 && (
          <div className="table-wrapper">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Institution Name</th>
                  <th>Type</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                </tr>
              </thead>
              <tbody>
                {institutions.map((inst, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{inst.tags?.name || "N/A"}</td>
                    <td>{inst.tags?.amenity}</td>
                    <td>{inst.lat}</td>
                    <td>{inst.lon}</td>
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

export default EducationInstitutions;