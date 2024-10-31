// Footer.js
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start mb-8">
          {/* Logo & About */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-3xl font-bold text-white mb-4">AQUAMYAN</h3>
            <p className="text-gray-400">
              Dedicated to keeping communities safe and informed. Join us in making a positive impact.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
              <li><Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link></li>
              <li><Link to="/community" className="hover:text-gray-300">Community</Link></li>
              <li><Link to="/resources" className="hover:text-gray-300">Resources</Link></li>
              <li><Link to="/emergency" className="hover:text-gray-300">Emergency</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-xl font-semibold text-white mb-4">Contact Us</h4>
            <p className="text-gray-400 mb-2">123 Safety St, Protectville, PA 12345</p>
            <p className="text-gray-400 mb-2">Email: support@aquamyan.com</p>
            <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-8">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200 transition">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200 transition">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200 transition">
            <FaInstagram size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200 transition">
            <FaLinkedin size={24} />
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-gray-500 border-t border-gray-700 pt-4">
          <p>&copy; {new Date().getFullYear()} AQUAMYAN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
