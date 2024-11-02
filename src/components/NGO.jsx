import React from "react";
import { motion } from "framer-motion";
import ngoData from "../data/ngoData";

const NGOs = () => (
  <div className="bg-white flex flex-col items-center py-16">
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-4xl font-bold mb-4"
    >
      NGOs in Myanmar
    </motion.h2>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="w-10/12  grid grid-cols-1 gap-24 mt-8"
    >
      {ngoData.map((ngo, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.03 }}
          className={`flex flex-col md:flex-row justify-between items-center p-6 rounded-lg shadow-lg transition hover:shadow-xl ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} bg-gray-100`}
        >
          {/* NGO Image */}
          <motion.img
            src={ngo.image}
            alt={`${ngo.name} logo`}
            className="w-full md:w-1/3 h-64 object-cover rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
          />

          {/* NGO Info */}
          <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pl-8" : "md:pr-8"} text-center md:text-left mt-4 md:mt-0`}>
            <motion.h3
              className="text-2xl font-bold text-gray-800 mb-2"
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {ngo.name}
            </motion.h3>
            <motion.p
              className="text-gray-700 text-lg"
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
            >
              {ngo.description}
            </motion.p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
);

export default NGOs;
