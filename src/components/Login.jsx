
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from 'react-loading';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      await login(username, password);
      navigate('/'); // Redirect to dashboard on successful login
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setLoading(false); // Stop loading
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
        <h2 className="text-2xl font-bold text-white text-center mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded hover:bg-gradient-to-l transition duration-200"
          >
            Login
          </button>
          <p className='text-white text-right mr-2 cursor-pointer' onClick={() => { navigate("/signup") }}>
            New user? Signup
          </p>
        </form>
        {loginError && (
          <p className="text-red-500 mt-4 text-center">{loginError}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
