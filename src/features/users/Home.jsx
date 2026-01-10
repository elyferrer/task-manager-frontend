import { useDispatch, useSelector, } from 'react-redux'
import { getUserDetails, logout } from './userSlice';
import { useNavigate } from 'react-router-dom';
import Task from '../tasks/Task';
import { useEffect, useState } from 'react';
import UserForm from '../components/UserForm';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.data);
    const [showUserForm, setShowUserForm] = useState(false);

    const handleUserData = async () => {
        await dispatch(getUserDetails())
    }
    
    const handleLogout = async () => {

        if(confirm("Are you sure you want to logout?")) await dispatch(logout());
       
        navigate('/login');
    }

    useEffect(() => {
        handleUserData();
    }, [dispatch])

    useEffect(() => {}, [user])

    return (
        <div>
            <div className={`fixed w-full h-screen bg-black bg-opacity-60 flex justify-center p-2 items-center ${showUserForm ? 'visible pointer-events-auto' : 'hidden pointer-events-none'}`}>
                <div className='w-full sm:w-3/5 md:w-1/3 mx-auto pt-5 bg-white rounded p-3'>
                    <div className='text-center p-2'>
                        <h1 className='text-2xl'>Update My Profile</h1>
                    </div>
                    <UserForm isUpdate={true} userData={user} />
                    <div>
                        <button type="button" className='w-full p-2 rounded' onClick={() => setShowUserForm(false)}>Cancel</button>
                    </div>
                </div>
                
            </div>
            <div className='w-full bg-blue-800'>
                <div className='grid grid-cols-2 gap-2'>
                    <div className='px-2'>
                        <h1 className='text-2xl pt-2 text-white'>Hello, { user.nickname }</h1>
                    </div>
                    <div className='text-right'>
                        <button onClick={() => setShowUserForm(true)} className='text-white bg-green-600 rounded px-3 py-1 m-2'>Profile</button>
                        <button onClick={handleLogout} className='text-white bg-red-500 rounded px-3 py-1 m-2'>Logout</button>
                    </div>
                </div>
            </div>
            
            {/* <h1>Home</h1> */}
            <Task />
            {/* <button onClick={handleGenerate}>Click me pre</button> */}
        </div>
    )
}

export default Home
