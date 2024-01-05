import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMoodsByDate, deleteMood } from '../features/moods/moodSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/App.css';

const Entries = () => {
    const dispatch = useDispatch();
    const { moods } = useSelector(state => state.moods);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [entriesForDate, setEntriesForDate] = useState([]);

    const handleFetchEntries = () => {
        dispatch(getMoodsByDate(selectedDate));
    };

    const handleDeleteEntry = (entryId) => {
        dispatch(deleteMood(entryId));
    };

    useEffect(() => {
        // Update the entries when moods or selectedDate changes
        const filteredEntries = moods.filter(mood => mood.date.split('T')[0] === selectedDate);
        setEntriesForDate(filteredEntries);
    }, [moods, selectedDate]);

    return (
        <div className="common-style"> {/* Apply the common style class */}
            <h2>Entries</h2>
            <div>
                <label htmlFor="datePicker">Select Date:</label>
                <input
                    type="date"
                    id="datePicker"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
                <button onClick={handleFetchEntries}>Fetch Entries</button>
            </div>
            {entriesForDate.length > 0 ? (
                <div>
                    <h3>Entries for {selectedDate}</h3>
                    {entriesForDate.map((entry) => (
                        <div key={entry._id} className="common-style"> {/* Apply the common style class */}
                            <p>Date: {new Date(entry.date).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</p>
                            <p>Mood Emoji: {entry.moodEmoji}</p>
                            {entry.note && <p>Note: {entry.note}</p>}
                            <button onClick={() => handleDeleteEntry(entry._id)} className="delete-button">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No entries available for the selected date.</p>
            )}
        </div>
    );
};

export default Entries;
