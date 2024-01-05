import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteMood } from '../features/moods/moodSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/App.css'

const MoodItem = ({ mood }) => {
    const dispatch = useDispatch();
    const formattedDate = new Date(mood.date).toLocaleString('en-US', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit'
    });

    return (
        <div className="mood-item">
            <span style={{ fontSize: '24px' }}>{mood.moodEmoji}</span>
            <span>{formattedDate}</span>         
            {mood.note && <p className="mood-note">{mood.note}</p>}
            <button onClick={() => dispatch(deleteMood(mood._id))} className="delete-button">
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    );
};

export default MoodItem;
