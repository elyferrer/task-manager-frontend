import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, update } from '../users/userSlice';

const UserForm = ({ isUpdate, userData }) => {
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.user.loggedIn);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [updatePassword, setUpdatePassword] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const [formData, setFormData] = useState({
        last_name: '',
        first_name: '',
        middle_name: '',
        nickname: '',
        username: '',
        email: ''
    });

    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ((!isUpdate || updatePassword) && password != passwordConfirmation) {
            alert('Password should match with the confirm password field');

            return;
        }

        try {
            if (isUpdate) {
                await dispatch(update({formData, password}));
            } else {
                await dispatch(register({formData, password}));

                setFormData({
                    last_name: '',
                    first_name: '',
                    middle_name: '',
                    nickname: '',
                    username: '',
                    email: ''
                });
            }

            setPassword('');
            setPasswordConfirmation('');
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const populateUpdate = () => {
        setFormData({
            last_name: userData.last_name,
            first_name: userData.first_name,
            middle_name: userData.middle_name,
            nickname: userData.nickname,
            username: userData.username,
            email: userData.email
        });
    }

    const handleSuccess = async () => {
        console.log(user.success);
        if (user.success != null) {
            await setShowSuccess(true);
        
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
        }
    }

    useEffect(() => {
        if (isUpdate) {
            populateUpdate();
        }
    }, [isUpdate, userData])

    useEffect(() => {}, [dispatch])

    useEffect(() => {
        handleSuccess();
    }, [user])

    return (
        <div>
            <form onSubmit={handleSubmit} className='overflow-y-scroll'>
                {
                    showSuccess ? 
                        <div className="text-center flex justify-center content-center">
                            <h1 className='text-center w-full bg-green-100 border border-2 border-green-500 text-green-800 p-3 mt-4 rounded font-bold'>{ user.success?.message }</h1>
                        </div>
                        : ''
                }
                <div className='m-2 grid grid-cols-3 gap-2'>
                    <label htmlFor="last_name" className='pt-2'>Last Name:</label>
                    <input type="text" className="w-full rounded p-2 border border-gray-400 col-span-2" 
                        name="last_name" id="last_name" value={formData.last_name} placeholder="Enter Last Name" onChange={handleChange}
                        required />
                </div>
                
                <div className='m-2 grid grid-cols-3 gap-2'>
                    <label htmlFor="first_name" className='pt-2'>First Name:</label>
                    <input type="text" className="w-full rounded p-2 border border-gray-400 col-span-2" 
                        name="first_name" id="first_name" value={formData.first_name} placeholder="Enter First Name" onChange={handleChange}
                        required />
                </div>
                
                <div className='m-2 grid grid-cols-3 gap-2'>
                    <label htmlFor="middle_name" className='pt-2'>Middle Name:</label>
                    <input type="text" className="w-full rounded p-2 border border-gray-400 col-span-2" 
                        name="middle_name" id="middle_name" value={formData.middle_name} placeholder="Enter Middle Name" onChange={handleChange} />
                </div>
                
                <div className='m-2 grid grid-cols-3 gap-2'>
                    <label htmlFor="nickname" className='pt-2'>Nickname:</label>
                    <input type="text" className="w-full rounded p-2 border border-gray-400 col-span-2" 
                        name="nickname" id="nickname" value={formData.nickname} placeholder="Enter Nickname" onChange={handleChange} />
                </div>
                
                <div className='m-2 grid grid-cols-3 gap-2'>
                    <label htmlFor="username" className='pt-2'>Username:</label>
                    <input type="text" className="w-full rounded p-2 border border-gray-400 col-span-2" 
                        name="username" id="username" value={formData.username} placeholder="Enter Username" onChange={handleChange}
                        required />
                </div>

                <div className='m-2 grid grid-cols-3 gap-2'>
                    <label htmlFor="email" className='pt-2'>Email:</label>
                    <input type="email" className="w-full rounded p-2 border border-gray-400 col-span-2" 
                        name="email" id="email" value={formData.email} placeholder="Enter Email" onChange={handleChange}
                        required />
                </div>

                {
                    isUpdate ?
                        <div className="m-2">
                            <button type="button" className={`w-full text-white mt-4 p-2 rounded
                                ${updatePassword ? 'bg-red-500' : 'bg-green-800'}`}
                                onClick={() => setUpdatePassword(!updatePassword)}>
                                    { updatePassword ? 'Cancel Password Update' : 'Update Password'}
                            </button>
                        </div>
                        : ''
                }
                
                {
                    !isUpdate || updatePassword ?
                        <>
                            <div className='m-2 grid grid-cols-3 gap-2'>
                                <label htmlFor="password" className='pt-2'>Password:</label>
                                <input type="password" className="w-full rounded p-2 border border-gray-400 col-span-2" 
                                    name="password" id="password" value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}
                                    required />
                            </div>
                            
                            <div className='m-2 grid grid-cols-3 gap-2'>
                                <label htmlFor="passwordConfirmation" className='pt-2'>Confirm Password:</label>
                                <input type="password" className="w-full rounded p-2 border border-gray-400 col-span-2" 
                                    name="passwordConfirmation" id="passwordConfirmation" value={passwordConfirmation} placeholder="Confirm Password" onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    required />
                            </div>
                        </> : ''
                }
                
                
                <div className='m-2'>
                    <button type="submit" className='w-full bg-blue-800 text-white mt-4 p-2 rounded'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default UserForm
