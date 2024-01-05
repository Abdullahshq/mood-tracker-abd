import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import moodService from './moodService';
import axios from 'axios';

const API_URL = '/api/moods/';

const initialState = {
  moods: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new mood
export const createMood = createAsyncThunk(
  'moods/create',
  async (moodData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await moodService.createMood(moodData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all user moods
export const getMoods = createAsyncThunk(
  'moods/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await moodService.getMoods(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch moods by date
export const getMoodsByDate = createAsyncThunk(
  'moods/getByDate',
  async (date, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API_URL}?date=${date}`, config);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user mood
export const deleteMood = createAsyncThunk(
  'moods/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await moodService.deleteMood(id, token);
      return id;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Fetch moods by week
export const getMoodsByWeek = createAsyncThunk(
  'moods/getByWeek',
  async ({ startDate, endDate }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await axios.get(`${API_URL}?startDate=${startDate}&endDate=${endDate}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch moods by month
export const getMoodsByMonth = createAsyncThunk(
  'moods/getByMonth',
  async ({ startDate, endDate }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await axios.get(`${API_URL}?startDate=${startDate}&endDate=${endDate}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const moodSlice = createSlice({
  name: 'mood',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.moods.push(action.payload);
      })
      .addCase(createMood.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMoods.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMoods.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.moods = action.payload;
      })
      .addCase(getMoods.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMoodsByDate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMoodsByDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.moods = action.payload;
      })
      .addCase(getMoodsByDate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteMood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.moods = state.moods.filter((mood) => mood._id !== action.payload);
      })
      .addCase(deleteMood.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMoodsByWeek.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMoodsByWeek.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.moods = action.payload;
      })
      .addCase(getMoodsByWeek.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMoodsByMonth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMoodsByMonth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.moods = action.payload;
      })
      .addCase(getMoodsByMonth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = moodSlice.actions;

export default moodSlice.reducer;
