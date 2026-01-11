import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const API_URL = "http://localhost:3000";

const initialState = {
  data: [],
};

export const getTasks = createAsyncThunk(
  'user/getTasks',
  async (id, thunkAPI) => {
    try {
        const response = await axios.get(`${API_URL}/tasks`, { withCredentials: true });
        
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
  }
);

export const createTask = createAsyncThunk(
  'user/createTask',
  async (formData, thunkAPI) => {

    const parsedFormData = {
      title: formData.title,
      details: formData.details,
      start_date: `${formData.start_date} ${formData.start_time}`,
      end_date: `${formData.end_date} ${formData.end_time}`,
      status: formData.status
    };

    try {
        const response = await axios.post(`${API_URL}/tasks`, parsedFormData, { withCredentials: true });
        
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const updateTask = createAsyncThunk(
  'user/updateTask',
  async ({ id, formData }, thunkAPI) => {
    const parsedFormData = {
      title: formData.title,
      details: formData.details,
      start_date: `${formData.start_date} ${formData.start_time}`,
      end_date: `${formData.end_date} ${formData.end_time}`,
      status: formData.status
    };

    try {
        const response = await axios.patch(`${API_URL}/tasks/${id}`, parsedFormData, { withCredentials: true });
        
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const deleteTask = createAsyncThunk(
  'user/deleteTask',
  async (id, thunkAPI) => {
    try {
        const response = await axios.delete(`${API_URL}/tasks/${id}`, { withCredentials: true });
        
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(getTasks.fulfilled, (state, action) => {
        state.data = action.payload;
      }),
      builder.addCase(createTask.fulfilled, (state, action) => {
        state.data.unshift(action.payload);
      }),
      builder.addCase(deleteTask.fulfilled, (state, action) => {
        state.data = state.data.filter(task => task._id.toString() !== action.payload._id);
      }),
      builder.addCase(updateTask.fulfilled, (state, action) => {
        state.data = state.data.filter(task => task._id.toString() !== action.payload._id);
        state.data.push(action.payload);
      })
  }
})

export default taskSlice.reducer