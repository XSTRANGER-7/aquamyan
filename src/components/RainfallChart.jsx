import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const rainfallData = {
  Yangon: [4.9, 2.5, 12.2, 43, 280, 484, 501, 494, 388, 190.7, 39.5, 5.7],
  Mandalay: [9.7, 4.9, 12.4, 28.1, 163, 150.9, 144.4, 206, 238.1, 193.3, 54.7, 12.9],
  Naypyidaw: [9.9, 3.2, 18.1, 26.3, 170.1, 308, 325.24, 313.4, 229.5, 119.4, 31.1, 10.3],
  Taunggyi: [12.0, 3.9, 8.8, 33.7, 136.13, 155.3, 176.9, 216.2, 187.1, 107, 36.8, 12.7],
  Monywa: [5.1, 2.5, 7.3, 20.5, 132.5, 130, 134.5, 183.8, 233.8, 176.3, 35.6, 7.3],
  Bago: [4.7, 1.1, 10.8, 47, 296.2, 545.1, 561.5, 547, 390.9, 170.5, 34.8, 6.1],
  Mawlamyine: [9.3, 5.7, 25, 81.1, 417, 728.6, 794.2, 766.7, 523.3, 193.2, 33.1, 10.4], 

};

const cities = Object.keys(rainfallData);

const RainfallChart = () => {
  const [selectedCity, setSelectedCity] = useState('Yangon');

  const chartData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: `Monthly Rainfall in ${selectedCity} (mm)`,
        data: rainfallData[selectedCity],
        fill: false,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className="flex flex-col items-center w-10/12 justify-center min-h-screen p-4 bg-gradient-to-r   from-zinc-300 to-blue-200">
      <h2 className="text-3xl font-bold text-black mb-4">Monthly Rainfall Data</h2>
      
      <select onChange={handleCityChange} value={selectedCity} className="mb-4 p-2 rounded bg-gray-700 text-white">
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      <Line 
        data={chartData} 
        options={{
          scales: {
            x: {
              title: {
                display: true,
                text: 'Months',
                color: 'black',
              },
              ticks: {
                color: 'black',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Rainfall (mm)',
                color: 'black',
              },
              ticks: {
                color: 'black',
              },
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              labels: {
                color: 'black',
              },
            },
          },
        }} 
      />
    </div>
  );
};

export default RainfallChart;
