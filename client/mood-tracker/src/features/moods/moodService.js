import api from '../../api/api';

const API_URL = '/moods/';

// Create a new mood
const createMood = async (moodData) => {
  const response = await api.post(API_URL, moodData);
  return response.data;
};

// Get all moods for the current user
const getMoods = async () => {
  const response = await api.get(API_URL);
  return response.data;
};

// Delete a specific mood
const deleteMood = async (moodId) => {
  const response = await api.delete(`${API_URL}${moodId}`);
  return response.data;
};

// Fetch moods by date
const getMoodsByDate = async (date) => {
  const response = await api.get(`${API_URL}date?date=${date}`);
  return response.data;
};

// Fetch moods by week
const getMoodsByWeek = async ({ startDate, endDate }) => {
  const response = await api.get(`${API_URL}date?startDate=${startDate}&endDate=${endDate}`);
  return response.data;
};

// Fetch moods by month
const getMoodsByMonth = async ({ startDate, endDate }) => {
  const response = await api.get(`${API_URL}date?startDate=${startDate}&endDate=${endDate}`);
  return response.data;
};

// Define the service object
const moodService = {
  createMood,
  getMoods,
  deleteMood,
  getMoodsByDate,
  getMoodsByWeek,
  getMoodsByMonth,
};

// Export the service object
export default moodService;
