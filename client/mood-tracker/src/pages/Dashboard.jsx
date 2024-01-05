// src/components/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import MoodForm from '../components/MoodForm';
import MoodItem from '../components/MoodItem';
import { reset } from '../features/moods/moodSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { moods, isLoading, isError, message } = useSelector((state) => state.moods);

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) navigate('/login');
    return () => dispatch(reset());
  }, [user, navigate, dispatch]);

  // Render
  if (isLoading) return <Spinner />;
  if (isError) {
    console.error(message);
    return <p>Error loading moods!</p>;
  }

  return (
    <>
      <section className='heading'>
        <h1>Hello {user && user.name}!</h1>
        <p>How are you feeling today?</p>
      </section>

      <MoodForm />

      <section className='content'>
        {moods.length > 0 ? (
          <div className='moods'>
            {moods.map((mood) => (
              <MoodItem key={mood._id} mood={mood} />
            ))}
          </div>
        ) : (
          <h3>No moods recorded for this date</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
