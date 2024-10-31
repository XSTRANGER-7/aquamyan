
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

// Airtable configuration from environment variables
const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID; 

const AIRTABLE_TABLE_NAME = 'resources';
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

const resourceCategories = ['Food', 'Clothing', 'Medicine', 'Shelter'];
const requestTypes = ['Donor', 'Recipient'];

const ResourceAllocation = () => {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({
    name: '',
    category: 'Food',
    quantity: '',
    location: '',
    type: 'Donor',
    status: 'Pending'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const response = await axios.get(AIRTABLE_URL, {
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`
          }
        });
        const airtableData = response.data.records.map(record => ({
          id: record.id,
          ...record.fields,
        }));
        setResources(airtableData);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleResourceChange = (event) => {
    const { name, value } = event.target;
    setNewResource((prevResource) => ({
      ...prevResource,
      [name]: value,
    }));
  };

  const addResource = async () => {
    setLoading(true);
    try {
      const payload = {
        fields: {
          name: newResource.name,
          category: newResource.category,
          quantity: parseInt(newResource.quantity, 10),
          location: newResource.location,
          type: newResource.type,
          status: newResource.status
        }
      };

      const response = await axios.post(AIRTABLE_URL, payload, {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      setResources([...resources, { id: response.data.id, ...response.data.fields }]);
      setNewResource({ name: '', category: 'Food', quantity: '', location: '', type: 'Donor', status: 'Pending' });
    } catch (error) {
      console.error('Error adding resource:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const donations = resources.filter(resource => resource.type === 'Donor');
  const requests = resources.filter(resource => resource.type === 'Recipient');

  return (
    <div className="min-h-screen p-4 bg-gradient-to-r from-blue-200 to-green-200 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-6 text-blue-900">Resource Allocation and Distribution</h2>

      <motion.div 
        className="bg-white shadow-lg p-6 rounded-lg w-full max-w-5xl mb-8 transition-transform duration-300 hover:scale-105"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-2xl font-semibold mb-4 text-blue-800">Add a Resource</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input 
            type="text" 
            name="name"
            placeholder="Resource Name"
            value={newResource.name}
            onChange={handleResourceChange}
            className="p-2 border rounded bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
          />

          <select 
            name="category"
            value={newResource.category}
            onChange={handleResourceChange}
            className="p-2 border rounded bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            {resourceCategories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <input 
            type="number" 
            name="quantity"
            placeholder="Quantity"
            value={newResource.quantity}
            onChange={handleResourceChange}
            className="p-2 border rounded bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
          />

          <input 
            type="text" 
            name="location" 
            placeholder="Location"
            value={newResource.location}
            onChange={handleResourceChange}
            className="p-2 border rounded bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
          />

          <select 
            name="type"
            value={newResource.type}
            onChange={handleResourceChange}
            className="p-2 border rounded bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            {requestTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          
          <button 
            onClick={addResource} 
            className="bg-blue-600 text-white rounded-lg py-2 shadow-md hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Resource'}
          </button>
        </div>
      </motion.div>

      <div className="w-full max-w-7xl flex gap-6 p-8 bg-orange-50 rounded-xl bg-transparent">
        <motion.div 
          className="bg-white shadow-lg p-6 rounded-lg mb-8 w-1/2 transition-transform duration-300 hover:scale-105"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-green-700">Donations</h3>
          {donations.length > 0 ? (
            <ul className="space-y-6">
              {donations.map((resource) => (
                <li key={resource.id} className="bg-green-50 p-4 rounded-lg shadow-md transition duration-200 hover:bg-gray-100">
                  <p><strong>Name:</strong> {resource.name}</p>
                  <p><strong>Category:</strong> {resource.category}</p>
                  <p><strong>Quantity:</strong> {resource.quantity}</p>
                  <p><strong>Location:</strong> {resource.location}</p>
                  <p><strong>Status:</strong> {resource.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No donations available</p>
          )}
        </motion.div>

        <motion.div 
          className="bg-white shadow-lg p-6 rounded-lg mb-8 w-1/2 transition-transform duration-300 hover:scale-105"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-red-700">Requests</h3>
          {requests.length > 0 ? (
            <ul className="space-y-6">
              {requests.map((resource) => (
                <li key={resource.id} className="bg-red-50 p-4 rounded-lg shadow-md transition duration-200 hover:bg-gray-100">
                  <p><strong>Name:</strong> {resource.name}</p>
                  <p><strong>Category:</strong> {resource.category}</p>
                  <p><strong>Quantity:</strong> {resource.quantity}</p>
                  <p><strong>Location:</strong> {resource.location}</p>
                  <p><strong>Status:</strong> {resource.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No requests available</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ResourceAllocation;
