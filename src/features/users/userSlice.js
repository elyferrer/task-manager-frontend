import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const API_URL = "http://localhost:3001";

const initialState = {
    username: '',
    loggedIn: false
};

export const login = createAsyncThunk(
    'user/login',
    async ({ username, password }, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/user/login`, {
                username,
                password
            }, { withCredentials: true });

            localStorage.setItem('u', response.data.username);
            localStorage.setItem('l', true);
            
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const getUserDetails = createAsyncThunk(
    'user/getUserDetails',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/user`, { withCredentials: true });
            console.log(response.data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

export const logout = createAsyncThunk(
    'user/logout',
    async (id, thunkAPI) => {
        try {
            await axios.delete(`${API_URL}/user/logout`, { withCredentials: true });
            localStorage.clear();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.loggedIn = true;
            state.username = action.payload.username

            console.log(state);
        }),
        builder.addCase(logout.fulfilled, (state, action) => {
            console.log(state);
        })
    }
})

// export const { create, update, deactivate } = userSlice.actions

export default userSlice.reducer