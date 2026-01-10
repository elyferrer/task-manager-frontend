import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../users/userSlice';

const UserForm = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.user.loggedIn);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        last_name: 'Kelstkaya',
        first_name: 'Alice',
        middle_name: '',
        nickname: 'Alice',
        username: 'alice123',
        email: 'alice@gmail.com',
        password: 'password',
        passwordConfirmation: 'password'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(register(formData));
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    useEffect(() => {

    }, [dispatch])

    useEffect(() => {
        if (loggedIn) {
            navigate('/');
        }
    }, [loggedIn])

    return (
        <div>
            <form onSubmit={handleSubmit} className=''>
                <div className='m-2'>
                    <input type="text" className="w-full rounded p-2 border border-gray-400" 
                        name="last_name" value={formData.last_name} placeholder="Enter Last Name" onChange={handleChange}
                        required />
                </div>
                
                <div className='m-2'>
                    <input type="text" className="w-full rounded p-2 border border-gray-400" 
                        name="first_name" value={formData.first_name} placeholder="Enter First Name" onChange={handleChange}
                        required />
                </div>
                
                <div className='m-2'>
                    <input type="text" className="w-full rounded p-2 border border-gray-400" 
                        name="middle_name" value={formData.middle_name} placeholder="Enter Middle Name" onChange={handleChange} />
                </div>
                
                <div className='m-2'>
                    <input type="text" className="w-full rounded p-2 border border-gray-400" 
                        name="nickname" value={formData.nickname} placeholder="Enter Nickname" onChange={handleChange} />
                </div>
                
                <div className='m-2'>
                    <input type="text" className="w-full rounded p-2 border border-gray-400" 
                        name="username" value={formData.username} placeholder="Enter Username" onChange={handleChange}
                        required />
                </div>

                <div className='m-2'>
                    <input type="email" className="w-full rounded p-2 border border-gray-400" 
                        name="email" value={formData.email} placeholder="Enter Email" onChange={handleChange}
                        required />
                </div>

                <div className='m-2'>
                    <input type="password" className="w-full rounded p-2 border border-gray-400" 
                        name="password" value={formData.password} placeholder="Enter Password" onChange={handleChange}
                        required />
                </div>
                
                <div className='m-2'>
                    <input type="password" className="w-full rounded p-2 border border-gray-400" 
                        name="passwordConfirmation" value={formData.passwordConfirmation} placeholder="Confirm Password" onChange={handleChange}
                        required />
                </div>
                
                <div className='m-2'>
                    <button type="submit" className='w-full bg-blue-800 text-white mt-4 p-2 rounded'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default UserForm
