import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMood } from '../features/moods/moodSlice';
import '../styles/App.css';

const MoodForm = () => {
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [note, setNote] = useState(''); 

    const emojis = {
      '😢': 1,  
      '😔': 2,  
      '😐': 3,  
      '😊': 4, 
      '🤩': 5   
    };

    const handleEmojiClick = (emoji, value) => {
        const date = new Date(selectedDate).toISOString();
        dispatch(createMood({ moodEmoji: emoji, moodValue: value, date, note })); 
        setNote(''); 
    };

    return (
        <div className="add-mood-panel">
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            <textarea 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note about your mood"
                className="note-textarea"
            />
            <div>
                {Object.entries(emojis).map(([emoji, value]) => (
                    <button 
                        key={emoji} 
                        onClick={() => handleEmojiClick(emoji, value)}
                        className="emoji-button"
                    >
                        {emoji}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MoodForm;
