import React from 'react';

const Search = ({ location, setLocation, fetchWeather }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchWeather(location);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter city..."
      />
      <button className="search-button" onClick={() => fetchWeather(location)}>Search</button>
    </div>
  );
};

export default Search;





