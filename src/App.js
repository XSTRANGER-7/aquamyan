import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import CommunityResilienceAndRecovery from './components/CommunityBoard';
import ResourceAllocation from './components/ResourceAllocation';
import EmergencySOS from './components/Emergency';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/community" element={<CommunityResilienceAndRecovery />} />
          <Route path="/resources" element={<ResourceAllocation/>} />
          <Route path="/emergency" element={<EmergencySOS/>} />
          {/* Add a Dashboard route as needed */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
