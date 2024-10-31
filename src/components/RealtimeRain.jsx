
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import FloodAlertBox from './FloodAlerts';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const W_API_KEY = process.env.WEATHER_API_KEY; 
const cities = ['Yangon', 'Mandalay', 'Naypyidaw', 'Taunggyi', 'Monywa', 'Bago'];

const cityCoordinates = {
    Yangon: { lat: 16.8409, lon: 96.1735 },
    Mandalay: { lat: 21.9756, lon: 96.1039 },
    Naypyidaw: { lat: 19.7454, lon: 96.1294 },
    Taunggyi: { lat: 20.7750, lon: 97.0385 },
    Monywa: { lat: 22.1106, lon: 95.1345 }, 
    Bago: { lat: 17.3352, lon: 96.4817 },
    Mawlamyine: { lat: 16.4900, lon: 97.6283 },

};

const RealTimeRain = () => {
  const [rainfallData, setRainfallData] = useState([]);
  const [alert, setAlert] = useState('');

  const fetchHourlyRainfallData = async () => {
    try {
      const results = await Promise.all(cities.map(async (city) => {
        const { lat, lon } = cityCoordinates[city];
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${W_API_KEY}`
        );

        return {
          city: response.data.name,
          rainfall: response.data.rain ? response.data.rain['1h'] || 0 : 0,
        };
      }));

      setRainfallData(results);
      checkFloodAlert(results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const checkFloodAlert = (data) => {
    const highRainfall = data.filter(item => item.rainfall > 5);
    if (highRainfall.length > 0) {
      setAlert(`Flood alert! High rainfall detected in: ${highRainfall.map(item => item.city).join(', ')}`);
    } else {
      setAlert('');
    }
  };

  useEffect(() => {
    fetchHourlyRainfallData();
    const intervalId = setInterval(fetchHourlyRainfallData, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  const chartData = {
    labels: rainfallData.map(item => item.city),
    datasets: [
      {
        label: 'Hourly Rainfall (mm)',
        data: rainfallData.map(item => item.rainfall),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className='flex flex-col w-9/12 items-center justify-center min-h-screen bg-gradient-to-r from-violet-300 to-blue-200 px-12 py-4 rounded-lg shadow-lg'>
        <h2 className="text-3xl font-bold text-black mb-4">Real-Time Hourly Rainfall Data</h2>
        
        <Line 
          data={chartData} 
          options={{
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Cities',
                  color: 'black',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Rainfall (mm)',
                  color: 'black',
                },
                beginAtZero: true,
              },
            },
          }} 
        />
      </div> 
      {alert && <FloodAlertBox alert={alert} />}
    </div>
  );
};

export default RealTimeRain;
