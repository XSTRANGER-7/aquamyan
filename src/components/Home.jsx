
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext'; // Ensure this import is correct
import { useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { MdDashboard, MdEmergencyShare } from "react-icons/md";
import { CgCommunity } from "react-icons/cg";
import { GrResources } from "react-icons/gr";
import Footer from './Footer';

import { FiLogOut } from 'react-icons/fi';

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
          const userDetails = await fetchUserDetails(currentUser.Username); // Ensure currentUser.Username exists
          setUserName(userDetails.Name); // Set the user's name
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
      {/* Full-Screen Background Section */}
      <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2020/10/29/15/03/flood-5696450_640.jpg')" }}>
        <motion.div className="absolute inset-0 bg-black opacity-20"></motion.div>
        <nav className="flex justify-between items-center mx-8 my-4 p-6 backdrop-filter backdrop-blur-sm bg-white bg-opacity-30 rounded-lg shadow-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-800">AQUAMYAN</div>
          <div className="flex space-x-12 justify-center items-center">
            {/* Navigation Links */}
            
            <div className="flex text-xl items-center text-black hover:text-gray-700 transition duration-50 py-2 mb-2">
            <button onClick={() => navigate('/')} className='flex justify-center items-center' >
            <FaHome className='mr-1' /> Home
            </button>
            </div>
            <div className="flex text-xl items-center  text-black hover:text-gray-700 transition duration-50 py-2 mb-2">
            <button onClick={() => navigate('/dashboard')} className='flex justify-center items-center' >
            <MdDashboard className='mr-1' /> Dashboard
            </button>
            </div>
            <div className="flex text-xl items-center text-black hover:text-gray-700 transition duration-50 py-2 mb-2">
            <button onClick={() => navigate('/community')} className='flex justify-center items-center' >
            <CgCommunity className='mr-1' /> Community
            </button>
            </div>
            <div className="flex text-xl items-center text-black hover:text-gray-700 transition duration-50 py-2 mb-2">
            <button onClick={() => navigate('/resources')} className='flex justify-center items-center' >
            <GrResources className='mr-1' /> Resources
            </button>
            </div>
            <div className="flex text-xl items-center text-black hover:text-gray-700 transition duration-50 py-2 mb-2">
            <button onClick={() => navigate('/emergency')} className='flex justify-center items-center' >
              <MdEmergencyShare className='mr-1' /> Emergency
            </button>
            </div>
          </div>
          <div className='text-white font-semibold rounded-full px-4 py-3 hover:bg-white hover:text-red-600 bg-red-600 transition duration-50 p-1'>
          <button
            onClick={handleLogout}  className='flex justify-center items-center'
          >
            <FiLogOut className="mr-1" />
            Logout
          </button>
          </div>
        </nav>

        <div className="flex-1 flex flex-col mt-[-70px] items-center justify-center text-center text-white relative z-10 min-h-screen ">

          <motion.div
            className="relative z-10 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-6xl font-bold mb-4">Welcome, {userName}!</h1>
            <p className="text-xl mb-8">We're glad to have you here.</p>
            <motion.button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              Explore Now
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* New Section for Scrolling Down */}
      <div className="bg-white flex flex-col items-center justify-center py-20" style={{ minHeight: "100vh" }}>
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          New Section Title
        </motion.h2>
        <motion.p
          className="text-lg mb-8 text-center max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          This is a new section that becomes visible when you scroll down. Here you can add more content, links, or anything else you want to showcase to the users.
        </motion.p>
        <motion.button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          Learn More
        </motion.button>
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;



















