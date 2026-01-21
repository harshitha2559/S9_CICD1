import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../components/styles.css";

const Temperature = () => {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(null);
  const [error, setError] = useState("");

    
const handleBtnclick = () => {
  setError("");

  // Step 1: City → Latitude & Longitude
  axios
    .get("https://geocoding-api.open-meteo.com/v1/search", {
      params: {
        name: city,
        count: 1,
      },
    })
    .then((geoRes) => {
      

      const { latitude, longitude } = geoRes.data.results[0];

      // Step 2: Get Weather
      return axios.get("https://api.open-meteo.com/v1/forecast", {
        params: {
          latitude,
          longitude,
          current_weather: true,
        },
      });
    })
    .then((Res) => {
      if (Res) {
        setTemp(Res.data.current_weather.temperature);
      }
    })
    .catch((err) => {
      setError("Something went wrong. Try again.");
      console.error(err);
    });
  };


  return (
    <div>
      <div className="head">
        <Link to="/">Main Page</Link>{" "}
        <Link to="/temperature">Weather Page</Link>
        <h3>Welcome to API access via Axios - Weather Page!</h3>
      </div>

      <br />

      <input
        type="text"
        placeholder="Enter your city"
        style={{
          width: 300,
          height: 50,
          padding: 10,
          color: "blue",
          backgroundColor: "yellow",
          fontSize: 18,
        }}
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <br/>

      <button onClick={handleBtnclick}>Check Temperature</button>

      <br/>


        <h1>
          Temperature in {city} is {temp} °C
        </h1>
      
    </div>
  );
};

export default Temperature;
