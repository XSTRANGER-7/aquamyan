
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from 'react-loading';

const Signup = () => {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous errors

    try {
      await signup(name, username, password);
      setSignupSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      if (error.message === "User already exists") { // Check for existing user error
        setError("User already exists. Please try a different username.");
      } else {
        setError(error.message); // General error
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900">
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center backdrop-blur-xs z-10">
          <Loading type="bubbles" color="#ffffff" height={50} width={50} />
        </div>
      )}
      <div className={`bg-gray-900 p-8 rounded-lg shadow-lg w-96 ${loading ? 'opacity-30' : 'opacity-100'}`}>
        <h2 className="text-2xl font-bold text-white text-center mb-4">Signup</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full p-2 bg-gray-700 rounded text-white placeholder-gray-400" 
            required 
          />
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="w-full p-2 bg-gray-700 rounded text-white placeholder-gray-400" 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-2 bg-gray-700 rounded text-white placeholder-gray-400" 
            required 
          />
          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded hover:bg-gradient-to-l transition duration-200">
            Signup
          </button>
          <p className="text-white text-right mr-2 cursor-pointer" onClick={() => { navigate("/login") }}>
            Already have an account? Login
          </p>
        </form>
        {signupSuccess && (
          <p className="text-green-500 mt-4 text-center">
            Signup successful! Redirecting to login...
          </p>
        )}
        {error && (
          <p className="text-red-500 mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Signup;
