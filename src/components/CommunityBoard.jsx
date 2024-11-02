
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserFriends, FaPlus, FaComments, FaPaperPlane } from 'react-icons/fa';

const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID; 
const PLANS_TABLE = 'Plans';
const MESSAGES_TABLE = 'Messages';

const CommunityResilienceAndRecovery = () => {
  const [longTermPlan, setLongTermPlan] = useState({ title: '', description: '' });
  const [message, setMessage] = useState('');
  const [plans, setPlans] = useState([]); // Initialize as empty array
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchPlans();
    fetchMessages();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${PLANS_TABLE}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.records) {
        setPlans(data.records.map(record => record.fields)); // Ensure data is mapped correctly
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${MESSAGES_TABLE}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.records) {
        setMessages(data.records.map(record => record.fields)); // Ensure data is mapped correctly
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleLongTermChange = (e) => {
    const { name, value } = e.target;
    setLongTermPlan({ ...longTermPlan, [name]: value });
  };

  const addLongTermPlan = async () => {
    if (longTermPlan.title && longTermPlan.description) {
      try {
        const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${PLANS_TABLE}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fields: longTermPlan
          })
        });
        const data = await response.json();
        if (data.fields) { // Check if fields are present in the response
          setPlans([...plans, data.fields]); // Update state with new plan
          setLongTermPlan({ title: '', description: '' }); // Reset input fields
        }
      } catch (error) {
        console.error('Error adding long-term plan:', error);
      }
    }
  };

  const sendMessage = async () => {
    if (message.trim()) {
      const newMessage = { content: message, sender: 'Anonymous' };
      try {
        const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${MESSAGES_TABLE}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fields: newMessage
          })
        });
        const data = await response.json();
        if (data.fields) { // Check if fields are present in the response
          setMessages([...messages, data.fields]); // Update state with new message
          setMessage(''); // Reset message input
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-blue-100 to-green-100 flex flex-col items-center justify-start">
      <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Community Resilience and Recovery</h2>

      <div className='flex w-11/12 gap-12 p-4'>
        {/* Long-Term Recovery Planning Section */}
      <motion.div
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-3xl font-semibold mb-4 text-green-600"><FaPlus /> Long-Term Recovery Planning</h3>
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={longTermPlan.title}
          onChange={handleLongTermChange}
          className="p-2 border rounded bg-gray-100 mb-2 w-full"
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={longTermPlan.description}
          onChange={handleLongTermChange}
          className="p-2 border rounded bg-gray-100 mb-2 w-full"
          rows="4"
        />
        <button
          onClick={addLongTermPlan}
          className="bg-green-500 text-white rounded-lg py-2 w-full flex items-center justify-center hover:bg-green-600 transition duration-300"
        >
          <FaPlus className="mr-2" /> Add Long-Term Plan
        </button>

        <h4 className="text-xl font-semibold mt-4">Plans List</h4>
        <ul className="mt-2">
          {plans.length > 0 ? (
            plans.map((plan, index) => (
              <li key={index} className="bg-green-50 p-4 rounded-lg mb-2 shadow hover:shadow-lg transition duration-300">
                <p><strong>{plan.title || 'Untitled'}</strong>: {plan.description || 'No description provided.'}</p>
              </li>
            ))
          ) : (
            <li className="bg-gray-200 p-4 rounded-lg mb-2">No plans available.</li>
          )}
        </ul>
      </motion.div>

      {/* Chat Section */}
      <motion.div
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-3xl font-semibold mb-4 text-purple-600"><FaComments /> Community Chat</h3>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 border rounded bg-gray-100 mb-2 w-full"
        />
        <button
          onClick={sendMessage}
          className="bg-purple-500 text-white rounded-lg py-2 w-full flex items-center justify-center hover:bg-purple-600 transition duration-300"
        >
          <FaPaperPlane className="mr-2" /> Send Message
        </button>

        <h4 className="text-xl font-semibold mt-4">Messages</h4>
        <ul className="mt-2 max-h-60 overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <li key={index} className="bg-purple-50 p-4 rounded-lg mb-2 shadow hover:shadow-lg transition duration-300">
                <p><strong>{msg.sender || 'Anonymous'}</strong>: {msg.content || 'No content available.'}</p>
              </li>
            ))
          ) : (
            <li className="bg-gray-200 p-4 rounded-lg mb-2">No messages available.</li>
          )}
        </ul>
      </motion.div>
      </div>
    </div>
  );
};

export default CommunityResilienceAndRecovery;
