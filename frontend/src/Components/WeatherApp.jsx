// Your React component file
import React, { useState, useEffect } from 'react';
import { getCurrentWeather, getWeatherForecast, getHistoricalWeather } from './WeatherApi';

const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    // Example: Fetch current weather for a city
    getCurrentWeather('Karachi').then((data) => {
      setCurrentWeather(data);
    });


    })

    if(!currentWeather){
        return null;
    }

  const {
    city_name,
    weather,
    main,
    wind,
    sys,
    } = currentWeather;

  return (
      <div className="bg-gray-200 rounded-lg p-4 max-w-sm mx-8">
        <h2 className="text-2xl font-semibold mb-4">Current Weather</h2>
        <div>
          <strong>Weather:</strong> {weather[0].description}
        </div>
        <div>
          <strong>Temperature:</strong> {main.temp} K
        </div>
        <div>
          <strong>Feels Like:</strong> {main.feels_like} K
        </div>
        <div>
          <strong>Min Temperature:</strong> {main.temp_min} K
        </div>
        <div>
          <strong>Max Temperature:</strong> {main.temp_max} K
        </div>
        <div>
          <strong>Pressure:</strong> {main.pressure} hPa
        </div>
        <div>
          <strong>Humidity:</strong> {main.humidity}%
        </div>
        <div>
          <strong>Wind Speed:</strong> {wind.speed} m/s, {wind.deg}°
        </div>
        <div>
          <strong>Sunrise:</strong> {new Date(sys.sunrise * 1000).toLocaleTimeString()}
        </div>
        <div>
          <strong>Sunset:</strong> {new Date(sys.sunset * 1000).toLocaleTimeString()}
        </div>
      </div>

    //   {forecast && (
    //     <div>
    //       <h2>Weather Forecast</h2>
    //       <pre>{JSON.stringify(forecast, null, 2)}</pre>
    //     </div>
    //   )}

    //   {historicalWeather && (
    //     <div>
    //       <h2>Historical Weather</h2>
    //       <pre>{JSON.stringify(historicalWeather, null, 2)}</pre>
    //     </div>
    //   )}
    // </div>
  );
};

export default WeatherApp;
