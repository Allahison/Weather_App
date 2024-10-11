import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './Components/Weather';
import Search from './Components/Search';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [isCelsius, setIsCelsius] = useState(true);
  const [history, setHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]); 
  const cities = [
    'Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Rawalpindi', 
    'Multan', 'Peshawar', 'Quetta', 'Gujranwala', 'Sialkot', 
    'Hyderabad', 'Gujrat', 'Sheikhupura', 'Mardan', 'Bahawalpur', 
    'Sargodha', 'Swat', 'Dera Ghazi Khan', 'Mirpur', 'Kotli'
  ]; // List of cities

  const fetchWeather = async (location) => {
    const unit = isCelsius ? 'metric' : 'imperial';
    const apiKey = 'dcbc1952fa81d12491007d2677f14bb8'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${unit}`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      setLocation(''); 
      setSuggestions([]); 
      setHistory((prevHistory) => [...new Set([location, ...prevHistory])]); 
    } catch (error) {
      alert("Failed to fetch weather data. Please try again.");
    }
  };

  const toggleUnits = () => setIsCelsius(!isCelsius);

  const getCurrentLocationWeather = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = 'dcbc1952fa81d12491007d2677f14bb8'; 
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${isCelsius ? 'metric' : 'imperial'}`;

        try {
          const response = await axios.get(url);
          setWeatherData(response.data);
        } catch (error) {
          alert("Failed to fetch weather data for your location.");
        }
      });
    }
  };

  useEffect(() => {
    getCurrentLocationWeather();
  }, [isCelsius]); 

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setLocation(inputValue);

    
    if (inputValue) {
      const filteredCities = cities.filter(city => 
        city.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setSuggestions(filteredCities);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (city) => {
    setLocation(city); 
    fetchWeather(city); 
    setSuggestions([]); 
  };

  const handleCustomCitySubmit = (event) => {
    event.preventDefault(); 
    if (location) {
      fetchWeather(location); 
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <form onSubmit={handleCustomCitySubmit} className="search-container">
        <input 
          type="text" 
          className="search-input" 
          value={location} 
          onChange={handleInputChange} 
          onFocus={() => setSuggestions(cities)} 
          placeholder="Enter city name..." 
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((city, index) => (
              <li key={index} onClick={() => handleSuggestionClick(city)}>
                {city}
              </li>
            ))}
          </ul>
        )}
        <button type="submit" className="custom-submit-btn">
          Search
        </button>
      </form>
      <button onClick={toggleUnits} className="toggle-units">
        Switch to {isCelsius ? 'Fahrenheit' : 'Celsius'}
      </button>
      {weatherData && <Weather data={weatherData} />}
      <h2>Search History</h2>
      <ul className="history-list">
        {history.map((city, index) => (
          <li key={index} onClick={() => fetchWeather(city)}>{city}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;





