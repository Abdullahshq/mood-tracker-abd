import axios from 'axios';

export const fetchMoods = () => {
  return axios.get('http://localhost:5000/api/moods').then(response => response.data);
};

export const addMood = (mood) => {
  return axios.post('http://localhost:5000/api/moods', mood).then(response => response.data);
};

export const deleteMood = (id) => {
  return axios.delete(`http://localhost:5000/api/moods/${id}`);
};
