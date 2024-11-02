
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { FaHome } from "react-icons/fa";
import { MdDashboard, MdEmergencyShare } from "react-icons/md";
import { CgCommunity } from "react-icons/cg";
import { GrResources } from "react-icons/gr";
import Footer from './Footer';
import { FiLogOut } from 'react-icons/fi';
import NGO from './NGO';
import myanmap from '../assets/map.webp';


const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser, logout, fetchUserDetails } = useAuth();
  const token = localStorage.getItem('token');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      const fetchDetails = async () => {
        try {
          const userDetails = await fetchUserDetails(currentUser.Username);
          setUserName(userDetails.Name);
        } catch (error) {
          console.error(error);
        }
      };

      fetchDetails();
    }
  }, [token, navigate, currentUser, fetchUserDetails]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="relative flex flex-col">
      <div className="h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2020/10/29/15/03/flood-5696450_640.jpg')" }}>
        <motion.div className="absolute h-screen inset-0 bg-black opacity-20"></motion.div>
        
        {/* Navbar */}
        <nav className="flex justify-between items-center mx-8 my-4 p-6 backdrop-filter backdrop-blur-sm bg-white bg-opacity-30 rounded-lg shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-800">AQUAMYAN</div>
          <div className="flex space-x-12 justify-center items-center">
            {/* Navigation Links */}
            <button onClick={() => navigate('/')} className="flex items-center text-xl text-black hover:text-gray-700">
              <FaHome className="mr-1" /> Home
            </button>
            <button onClick={() => navigate('/dashboard')} className="flex items-center text-xl text-black hover:text-gray-700">
              <MdDashboard className="mr-1" /> Dashboard
            </button>
            <button onClick={() => navigate('/community')} className="flex items-center text-xl text-black hover:text-gray-700">
              <CgCommunity className="mr-1" /> Community
            </button>
            <button onClick={() => navigate('/resources')} className="flex items-center text-xl text-black hover:text-gray-700">
              <GrResources className="mr-1" /> Resources
            </button>
            <button onClick={() => navigate('/emergency')} className="flex items-center text-xl text-black hover:text-gray-700">
              <MdEmergencyShare className="mr-1" /> Emergency
            </button>
          </div>
          <button onClick={handleLogout} className="text-white font-semibold rounded-full px-4 py-3 bg-red-600 hover:bg-white hover:text-red-600 flex items-center">
            <FiLogOut className="mr-1" /> Logout
          </button>
        </nav>

        {/* Welcome Section */}
        <div className="flex-1 flex flex-col mt-[-70px] items-center justify-center text-center text-white relative z-10 min-h-screen">
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-6xl font-bold mb-4">Welcome, {userName}!</h1>
            <p className="text-xl mb-8">We're glad to have you here.</p>
            <motion.button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300" whileHover={{ scale: 1.05 }}>
              Explore Now
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* 3D Map Section */}
      <div className="bg-gray-100 py-16 flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-8 text-center">Explore Myanmar</h2>
        <div className="w-full h-[500px] flex my-4 mx-10 px-16 gap-16"> 
         <img src={myanmap} alt="" />
         <div className='flex justify-center items-center p-12'>
         <h1 className='text-xl font-semibold'><span className='text-blue-600'>Myanmar</span> frequently faces devastating floods, particularly in regions like Yangon, Bago, Magway, and Ayeyarwady, which are at high risk due to heavy monsoons and river overflows. Our project focuses on supporting NGOs that provide crucial aid and resources to these flood-prone areas. By connecting communities with NGOs dedicated to flood relief, recovery, and disaster preparedness, we aim to reduce the impact of these events and enhance resilience in the most vulnerable cities.</h1>
        
         </div>
        </div>
      </div>
 
      <NGO/>
      <Footer />
    </div>
  );
};

export default HomePage;
