import React from 'react';

const Weather = ({ data }) => {
  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className="weather-box">
      <h2 className="weather-detail">{data.name}</h2>
      <img src={iconUrl} alt={data.weather[0].description} />
      <p className="temperature">{Math.round(data.main.temp)}°</p>
      <p className="description">{data.weather[0].description}</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;


