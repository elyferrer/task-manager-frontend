import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const API_URL = "http://localhost:3000";

const initialState = {
    username: localStorage.getItem('u'),
    data: {},
    loggedIn: localStorage.getItem('l'),
    error: null,
    success: null
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
            
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

export const register = createAsyncThunk(
    'user/register',
    async ({ formData, password }, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/user`, { ...formData, password }, { withCredentials: true });

            if (response.status === 201) {
                await axios.post(`${API_URL}/user/login`, 
                    { username: formData.username, password: password }, { withCredentials: true })
                .then((response) => {
                    localStorage.setItem('u', response.data.username);
                    localStorage.setItem('l', true);

                    return response.data;
                })
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const update = createAsyncThunk(
    'user/update',
    async ({ formData, password }, thunkAPI) => {
        if (password != '') {
            formData = { ...formData, password };
        }
        try {
            const response = await axios.put(`${API_URL}/user`, formData, { withCredentials: true });
             
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

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

export const deleteUser = createAsyncThunk(
    'user/delete',
    async (id, thunkAPI) => {
        try {
            await axios.delete(`${API_URL}/user/delete`, { withCredentials: true });
            localStorage.clear();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state) => {
            state.loggedIn = true;
        }),
        builder.addCase(register.rejected, (state, action) => {
            state.error = action.payload
        }),
        builder.addCase(login.fulfilled, (state, action) => {
            state.loggedIn = true;
            state.username = action.payload.username
        }),
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.payload
        }),
        builder.addCase(logout.fulfilled, (state) => {
            state.loggedIn = false
            state.error = null;
        }),
        builder.addCase(getUserDetails.fulfilled, (state, action) => {
            state.data = action.payload;
        }),
        builder.addCase(update.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.success = { message: action.payload.message };
            state.error = null;
        }),
        builder.addCase(update.rejected, (state, action) => {
            state.error = { message: action.payload.message };
            state.success = null;
        }),
        builder.addCase(deleteUser.fulfilled, (state) => {
            state.loggedIn = false;
            state.error = null;
        })
    }
})

export default userSlice.reducer