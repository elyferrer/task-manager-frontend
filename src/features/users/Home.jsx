import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUserDetails, logout } from './userSlice';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../tasks/TaskForm';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGenerate = async () => {
        await dispatch(getUserDetails())
    }
    
    const handleLogout = () => {
        dispatch(logout())

        navigate('/login');
    }

    return (
        <div>
            <h1>Home</h1>
            <TaskForm />
            <button onClick={handleGenerate}>Click me pre</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home
