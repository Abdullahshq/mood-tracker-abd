import axios from 'axios';

const API_URL = '/api/moods/';

// Create a new mood
const createMood = async (moodData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, moodData, config);
  return response.data;
};

// Get all moods for the current user
const getMoods = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Delete a specific mood
const deleteMood = async (moodId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}${moodId}`, config);
  return response.data;
};

// Fetch moods by date
const getMoodsByDate = async (date, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}?date=${date}`, config);
  return response.data;
};

// Define the service object
const moodService = {
  createMood,
  getMoods,
  deleteMood,
  getMoodsByDate,
};

// Export the service object
export default moodService;
