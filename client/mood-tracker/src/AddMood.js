import React, { useState } from 'react';
import axios from 'axios';

const moodOptions = [
  { emoji: '😊', value: 5 },
  { emoji: '🙂', value: 4 },
  { emoji: '😐', value: 3 },
  { emoji: '🙁', value: 2 },
  { emoji: '😢', value: 1 }
];

const AddMood = ({ onMoodAdded }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const addMood = (mood) => {
    axios.post('http://localhost:5000/api/moods', { moodEmoji: mood.emoji, moodValue: mood.value, date })
      .then(response => {
        onMoodAdded(response.data);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="add-mood-panel">
      <h2>How are you feeling today?</h2>
      <div>
        {moodOptions.map((mood) => (
          <button
            key={mood.value}
            className="emoji-button"
            onClick={() => addMood(mood)}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
      <label>
        Date:
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </label>
    </div>
  );
};

export default AddMood;
