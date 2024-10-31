
// Dashboard.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLogOut } from 'react-icons/fi';
import { BiWater, BiCloudRain } from 'react-icons/bi';
import { MdDashboard } from 'react-icons/md';
import RealTimeRain from './RealtimeRain';
import ResourceAllocation from './ResourceAllocation';
import CommunityBoard from './CommunityBoard';
import WeatherCard from './WeatherCard';
import RainfallChart from './RainfallChart';
import FloodAlertBox from './FloodAlerts';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg rounded-lg w-full max-w-7xl p-6 md:p-8"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <MdDashboard className="text-blue-500" />
            Myanmar Flood Relief Dashboard
          </h2>
          <button
            onClick={handleLogout}
            className="flex items-center text-red-500 font-medium hover:text-red-600 transition duration-200"
          >
            <FiLogOut className="mr-1" />
            Logout
          </button>
        </div>

        {currentUser ? (
          <>
            {/* Dashboard Content */}
            <div className="grid gap-6">
              {/* Flood Alert and Weather Forecast Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className=''>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
                    <BiWater className="text-2xl" />
                    Realtime Flood Alert System
                  </h3>
                  <FloodAlertBox />
                </motion.div>
                </div>

               <div className='col-span-2'>
               <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-r from-indigo-100 to-indigo-50 p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold text-indigo-600 flex items-center gap-2 mb-2">
                    <BiCloudRain className="text-2xl" />
                    Weather Forecast
                  </h3>
                  <WeatherCard />
                </motion.div>
               </div>
              </div>

              {/* Real-Time Rain Data */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-r from-blue-100 to-blue-50 p-10 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold text-blue-600 flex items-center gap-2 mb-4">
                  <BiWater className="text-2xl" />
                  Real-Time Rain Data
                </h3>
                <RealTimeRain />
              </motion.div>

              {/* Rainfall Chart */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-r from-teal-100 to-teal-50 p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold text-teal-600 flex items-center gap-2">
                  Rainfall Chart
                </h3>
                <RainfallChart />
              </motion.div>
            </div>
          </>
        ) : (
          <p className="text-red-500 text-center mt-6">You are not logged in. Please log in again.</p>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
