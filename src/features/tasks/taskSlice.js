import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const API_URL = "http://localhost:3001";

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
    try {
        const response = await axios.post(`${API_URL}/tasks`, formData, { withCredentials: true });
        
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
        state.data.push(action.payload);
      }),
      builder.addCase(deleteTask.fulfilled, (state, action) => {
        console.log(action.payload._id);
        state.data = state.data.filter(task => task._id.toString() !== action.payload._id);
      })
  }
})

// Action creators are generated for each case reducer function
// export const { create, update, remove } = taskSlice.actions

export default taskSlice.reducer