import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddMood from './AddMood'; 
import './App.css'; 

function App() {
  const [moods, setMoods] = useState([]);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/moods')
      .then(response => {
        setMoods(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleMoodAdded = (newMood) => {
    console.log('Mood added:', newMood);
  };

  const fetchMoodsByDate = () => {
    axios.get(`http://localhost:5000/api/moods?date=${filterDate}`)
      .then(response => {
        setMoods(response.data);
      })
      .catch(error => console.error(error));
  };

  const deleteMood = (id) => {
    axios.delete(`http://localhost:5000/api/moods/${id}`)
      .then(() => {
        setMoods(moods.filter(mood => mood._id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Mood Tracker</h1>

      <AddMood onMoodAdded={handleMoodAdded} />

      <div className="centered-content">
        <form onSubmit={(e) => { e.preventDefault(); fetchMoodsByDate(); }} className="form-element">
          <label>
            Filter Date:
            <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} />
          </label>
          <button type="submit">Get Moods</button>
        </form>
        </div>
        
      {moods.map(mood => (
        <div key={mood._id}>
          {mood.moodEmoji} - {new Date(mood.date).toLocaleDateString()}
          <button onClick={() => deleteMood(mood._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
