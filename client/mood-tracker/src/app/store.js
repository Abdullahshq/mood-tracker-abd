import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import moodReducer from '../features/moods/moodSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    moods: moodReducer,
  },
});
