
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTemperatureHigh, FaWind, FaTint } from 'react-icons/fa';

const W_API_KEY = process.env.WEATHER_API_KEY; 

const cityCoordinates = {
    Yangon: { lat: 16.8409, lon: 96.1735 },
    Mandalay: { lat: 21.9756, lon: 96.1039 },
    Naypyidaw: { lat: 19.7454, lon: 96.1294 },
    Taunggyi: { lat: 20.7750, lon: 97.0385 },
    Monywa: { lat: 22.1106, lon: 95.1345 },
    Bago: { lat: 17.3352, lon: 96.4817 },
    Mawlamyine: { lat: 16.4900, lon: 97.6283 },
};

const WeatherCard = () => {
  const [selectedCity, setSelectedCity] = useState('Yangon');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (city) => {
    try {
      const coordinates = cityCoordinates[city];
      if (!coordinates) return;

      const { lat, lon } = coordinates;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${W_API_KEY}&units=metric`
      ); 

      setWeather({
        temp: response.data.main.temp,
        wind: response.data.wind.speed,
        humidity: response.data.main.humidity,
        icon: response.data.weather[0].icon,
        description: response.data.weather[0].description
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className="weather-card flex flex-col items-center justify-center px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform  text-white">
      <h3 className="text-2xl font-semibold mb-2">Weather in {selectedCity}</h3>
      
      <select
        value={selectedCity}
        onChange={handleCityChange}
        className="mb-4 p-2 rounded bg-gray-700 text-white"
      >
        {Object.keys(cityCoordinates).map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {weather ? (
        <>
         <div className='flex gap-8 px-4'>
         <div className='flex flex-col justify-center ml-6'>
         <img
            src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            className="w-20 h-20 mb-2"
          />
          <p className="text-lg capitalize mb-4">{weather.description}</p>
         </div>
          
          <div className="flex justify-between gap-6 items-center w-full px-4">
            <div className="flex flex-col items-center">
              <FaTemperatureHigh className="text-3xl mb-1" />
              <p>{weather.temp}°C</p>
              <span className="text-xs">Temperature</span>
            </div>
            <div className="flex flex-col items-center">
              <FaWind className="text-3xl mb-1" />
              <p>{weather.wind} m/s</p>
              <span className="text-xs">Wind Speed</span>
            </div>
            <div className="flex flex-col items-center">
              <FaTint className="text-3xl mb-1" />
              <p>{weather.humidity}%</p>
              <span className="text-xs">Humidity</span>
            </div>
          </div>
         </div>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherCard;
