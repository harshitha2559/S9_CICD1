import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const FoodPlaces = () => {
  const [city, setCity] = useState("");
  const [foodPlaces, setFoodPlaces] = useState([]);
  const [error, setError] = useState("");

  const handleBtnclick = async () => {
    setError("");
    setFoodPlaces([]);

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
          node["amenity"="restaurant"](around:10000,${latitude},${longitude});
          node["amenity"="cafe"](around:10000,${latitude},${longitude});
          node["amenity"="fast_food"](around:10000,${latitude},${longitude});
          node["amenity"="food_court"](around:10000,${latitude},${longitude});
          node["shop"="bakery"](around:10000,${latitude},${longitude});
        );
        out body;
      `;

      const foodRes = await axios.post(
        "https://overpass-api.de/api/interpreter",
        overpassQuery,
        { headers: { "Content-Type": "text/plain" } }
      );

      setFoodPlaces(foodRes.data.elements);
    } catch (err) {
      setError("Unable to fetch food places.");
      console.error(err);
    }
  };

  return (
    <div className="page-container food-bg">

      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">🍴 Food Explorer</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/temperature">Weather</Link>
          <Link to="/population">Population</Link>
          <Link to="/education">Education</Link>
          <Link to="/water">Water</Link>
          <Link to="/food" className="active">Food</Link>
        </div>
      </nav>

      {/* Card */}
      <div className="content-card wide-card">
        <h1>🍕 Food Places</h1>
        <p>Find restaurants, cafes, bakeries, and food courts near a city.</p>

        <input
          type="text"
          placeholder="Enter city name"
          className="city-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button className="action-btn" onClick={handleBtnclick}>
          Get Food Places
        </button>

        {error && <p className="error-text">{error}</p>}

        {foodPlaces.length > 0 && (
          <div className="table-wrapper">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                </tr>
              </thead>
              <tbody>
                {foodPlaces.map((place, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{place.tags?.name || "N/A"}</td>
                    <td>
                      {place.tags?.amenity ||
                        place.tags?.shop ||
                        "Food Place"}
                    </td>
                    <td>{place.lat}</td>
                    <td>{place.lon}</td>
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

export default FoodPlaces;