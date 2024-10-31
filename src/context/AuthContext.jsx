
import React, { createContext, useContext, useState, useEffect } from 'react';
import Airtable from 'airtable';

const AuthContext = createContext();

const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID; 

// Initialize Airtable
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Retrieve user data from local storage on initialization
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  });

  useEffect(() => {
    // Store current user in local storage
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    // Check for token on initialization
    const token = localStorage.getItem('token'); 
    if (!token) {
      setCurrentUser(null); // Clear currentUser if no token found
    }
  }, []);

  const fetchUserDetails = async (username) => {
    try {
      const records = await base('Users')
        .select({
          filterByFormula: `{Username} = "${username}"`,
        })
        .firstPage();

      if (records.length > 0) {
        return records[0].fields; // Return user fields
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw new Error(error.message);
    }
  };

  // Signup function
  const signup = async (name, username, password) => {
    try {
      const newUser = { fields: { Name: name, Username: username, Password: password } };
      await base('Users').create([newUser]);
      setCurrentUser(newUser.fields); // Update currentUser state
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  };

  // Login function
  const login = async (username, password) => {
    try {
      const records = await base('Users')
        .select({
          filterByFormula: `{Username} = "${username}"`,
        })
        .firstPage();

      if (records.length > 0) {
        const user = records[0].fields;
        if (user.Password === password) {
          setCurrentUser(user);
          localStorage.setItem('token', 'qdjebdeijbrjefr.efhrebfjhejfc-erhjfberhbrfntgkntb-gfhbrtjgsbrjbvskhbvtlr-htgbjhjrtbvhjtrbvgtbtrhyt.htgjtrngjrstnejgvfherjfce'); // Store token in local storage
          return true; // Successful login
        } else {
          throw new Error('Invalid password');
        }
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error(error.message);
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('token'); // Remove token on logout
  };

  // Context value
  const value = {
    currentUser,
    signup,
    login,
    logout,
    fetchUserDetails,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
