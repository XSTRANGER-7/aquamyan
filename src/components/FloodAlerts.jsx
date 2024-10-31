
import React from 'react';
import { AiFillAlert } from 'react-icons/ai';
import { IoWaterSharp } from 'react-icons/io5';
import { motion } from 'framer-motion';
import img from '../assets/rain.webp';
import img2 from '../assets/rain3.jpg';

const FloodAlertBox = ({ alert }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`mt-6 p-6 rounded-lg shadow-lg flex flex-col items-center ${
        alert ? 'bg-red-50 border border-red-400' : 'bg-green-50 border border-green-400'
      }`}
      style={{ width: '100%' }}
    >
      {alert ? (
        <>
          <div>
          <div>
          <AiFillAlert size={36} className="text-red-600 mb-2 animate-pulse" />
          <h2 className="text-xl font-semibold text-red-700">High Flood Alert</h2>
          <p className="text-red-600 font-medium mt-2 text-center">{alert}</p>
          </div>
          <img src={img} alt="Rainy Weather" className="w-24 mt-4 rounded-lg shadow-md" />
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-8">
            <div className='flex flex-col items-center'>
            <IoWaterSharp size={36} className="text-blue-500 mb-2" />
            <p className="text-lg font-semibold text-blue-700">No Flood Alert</p>
            <p className="text-gray-600 font-medium mt-2 text-center">All clear at this time</p>
            </div>
            <img src={img2} alt="Calm Weather" className="w-32 mt-4 rounded-lg shadow-md" />
          </div>
        </>
      )}
    </motion.div>
  );
};

export default FloodAlertBox;
