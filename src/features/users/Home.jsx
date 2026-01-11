import { useDispatch, useSelector, } from 'react-redux'
import { getUserDetails, deleteUser, logout } from './userSlice';
import { useNavigate } from 'react-router-dom';
import Task from '../tasks/Task';
import { useEffect, useState } from 'react';
import UserForm from '../components/UserForm';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.data);
    const userState = useSelector((state) => state.user);
    const [showUserForm, setShowUserForm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleUserData = async () => {
        await dispatch(getUserDetails())
    }

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete your account?")) await dispatch(deleteUser());
    }
    
    const handleLogout = async () => {
        if(confirm("Are you sure you want to logout?")) await dispatch(logout());
        navigate('/login');
    }

    const handleSuccess = async () => {
        if (userState.success != null) {
            await setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
            
        }
    };

    const handleError = async () => {
        if (userState.error != null) {
            await setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 5000);
        }
    }

    useEffect(() => {
        handleUserData();
    }, [dispatch])

    useEffect(() => {
        handleSuccess();
        handleError();
    }, [user, userState])

    return (
        <div>
            <div className={`fixed w-full h-screen bg-black bg-opacity-60 flex justify-center p-2 items-center ${showUserForm ? 'visible pointer-events-auto' : 'hidden pointer-events-none'}`}>
                <div className='w-full sm:w-3/5 md:w-1/3 mx-auto pt-5 bg-white rounded p-3'>
                    <div className='text-center p-2'>
                        <h1 className='text-2xl'>Update My Profile</h1>
                    </div>
                    <UserForm isUpdate={true} userData={user} />
                    <div className='px-2'>
                        <button type="button" className='w-full p-2 rounded' onClick={() => setShowUserForm(false)}>Cancel</button>
                    </div>
                    {
                        userState.success && showSuccess ? 
                            <div className="text-center flex justify-center content-center">
                                <h1 className='text-center w-full bg-green-100 border border-2 border-green-500 text-green-800 p-3 mt-4 rounded font-bold'>{ userState.success?.message }</h1>
                            </div>
                            : ''
                    }
                    {
                        userState.error != null && showError ? 
                            <div className="text-center flex justify-center content-center">
                                <h1 className='text-center w-full bg-red-100 border border-2 border-red-500 text-red-800 p-3 mt-4 rounded font-bold'>{ userState.error?.message }</h1>
                            </div>
                            : ''
                    }
                </div>
                
            </div>
            <div className='w-full bg-blue-800'>
                <div className='grid grid-cols-2 gap-2'>
                    <div className='px-2'>
                        <h1 className='text-2xl pt-2 text-white'>Hello, { user.nickname == '' ? user.first_name : user.nickname }</h1>
                    </div>
                    <div className='text-right'>
                        <button onClick={() => setShowUserForm(true)} className='text-white bg-green-600 rounded px-3 py-1 m-2'>Profile</button>
                        <button onClick={handleLogout} className='text-white bg-red-500 rounded px-3 py-1 m-2'>Logout</button>
                    </div>
                </div>
            </div>
            
            <Task />
        </div>
    )
}

export default Home
