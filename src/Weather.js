import "./Weather.css";
import React, { useState, useEffect } from "react";

export default function Weather() {
  const [post, setPost] = useState(null);
  const [place, setPlace] = useState("Lucknow");
  const [currentGif, setCurrentGif] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const d = new Date();

  const getData = () => {
    setLoading(true);
    setError(null);

    fetch(`https://api.weatherapi.com/v1/current.json?key=0bab7dd1bacc418689b143833220304&q=${place}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setError(json.error.message);
          setPost(null);
        } else {
          setPost(json);
        }
      })
      .catch(() => setError("Failed to fetch data"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!post) return;

    const condition = post.current.condition.text;
    let gif = "default";

    switch (condition) {
      case "Partly cloudy":
        gif = "partlycloudy";
        break;
      case "Mist":
        gif = "mist";
        break;
      case "Patchy rain possible":
      case "Patchy light rain":
        gif = "patchyrain";
        break;
      case "Heavy rain":
      case "Moderate or heavy rain with thunder":
        gif = "heavyrain";
        break;
      case "Light rain shower":
        gif = "lightrainshower";
        break;
      case "Sunny":
        gif = "sunny";
        break;
      default:
        gif = "default";
    }

    setCurrentGif(gif);
  }, [post]);

  return (
    <div id={currentGif} className="maindiv">
  <h2 className="title">🌤️ Weather App</h2>

  <div className="input-container">
    <input
      type="text"
      id="findplace"
      placeholder="Enter city..."
      onChange={(event) => setPlace(event.target.value)}
      value={place}
    />
    <button className="search-btn" onClick={getData}>
      Search
    </button>
  </div>

  {loading && <h3 className="loading">Fetching data...</h3>}
  {error && <h3 className="error">{error}</h3>}

  {post && (
    <div id="result">
      <h2>🌍 City: {post.location.name}</h2>
      <h2>🏳 Country: {post.location.country}</h2>
      <h2>📅 Date: {d.getDate()}/{d.getMonth() + 1}/{d.getFullYear()}</h2>
      <h2>🌡 Temperature: {post.current.temp_c}°C</h2>
      <h2>🌦 {post.current.condition.text}</h2>
    </div>
  )}
</div>

  );
}
