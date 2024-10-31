
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoMdWarning } from 'react-icons/io';

const EmergencySOS = () => {
  const [isActivated, setIsActivated] = useState(false);

  const handleButtonClick = () => {
    setIsActivated(true);
    setTimeout(() => {
      setIsActivated(false);
    }, 2000); // Reset after 2 seconds
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg relative">
        <IoMdWarning size={50} className="text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Emergency SOS</h2>
        <p className="text-gray-600 mb-8">Press the button to send an emergency alert to nearby users.</p>

        <div className="relative flex justify-center items-center">
          {/* Circular Button */}
          <motion.div
            className="rounded-full bg-red-500 p-8 cursor-pointer shadow-lg"
            whileTap={{ scale: 0.9 }}
            onClick={handleButtonClick}
          >
            <span className="text-white text-lg font-bold">SOS</span>
          </motion.div>

          {/* Wave Animation */}
          {isActivated && (
            <motion.div
              className="absolute rounded-full border-4 border-red-400"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1 }}
              style={{
                width: '150px',
                height: '150px',
              }}
            />
          )}
        </div>

        {/* Message */}
        {isActivated && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 text-green-600 font-medium"
          >
            Emergency alert sent to all nearby users!
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default EmergencySOS;
