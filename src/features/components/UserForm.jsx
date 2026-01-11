import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, update } from '../users/userSlice';

const UserForm = ({ isUpdate }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [updatePassword, setUpdatePassword] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [formData, setFormData] = useState({
        last_name: '',
        first_name: '',
        middle_name: '',
        nickname: '',
        username: '',
        email: ''
    });
    const [formError, setFormError] = useState({
        username: '',
        password: '',
        passwordConfirmation: ''
    });

    const validateFormData = () => {
        if ((!isUpdate || updatePassword) && password != passwordConfirmation) {
            setFormError({ ...formError, passwordConfirmation: 'Password should match with the confirm password field' });
        }

        if (formData.username.length < 8 || formData.username.length > 50) {
            setFormError({ ...formError, username: 'Username should be between 8 and 50 characters in length' });
        }

        if ((isUpdate && updatePassword && password.length < 8) || (!isUpdate && password.length < 8)) {
            setFormError({ ...formError, password: 'Password should be atleast 8 characters long' });
        }

        setTimeout(() => {
            setFormError({
                username: '',
                password: '',
                passwordConfirmation: ''
            });
        }, 10000);

        if (formError.username != '' || formError.password != '' || formError.passwordConfirmation != '') {
            return false;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        validateFormData();

        try {
            if (isUpdate) {
                await dispatch(update({formData, password}));

                setPassword('');
                setPasswordConfirmation('');
            } else {
                await dispatch(register({formData, password}));

                if (user.error != null) {
                    setFormData({
                        last_name: '',
                        first_name: '',
                        middle_name: '',
                        nickname: '',
                        username: '',
                        email: ''
                    });

                    setPassword('');
                    setPasswordConfirmation('');
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const populateUpdate = async () => {
        await setFormData({
            last_name: user.data.last_name,
            first_name: user.data.first_name,
            middle_name: user.data.middle_name,
            nickname: user.data.nickname,
            username: user.data.username,
            email: user.data.email
        });
    }

    useEffect(() => {}, [dispatch])

    useEffect(() => {
        if (user.loggedIn) {
            navigate('/');
        }

        if (isUpdate && user.data) {
            populateUpdate();
        }
    }, [user])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='m-2 grid grid-cols-3 gap-2'>
                    <label htmlFor="last_name" className='pt-2'>Last Name:</label>
                    <input type="text" className="w-full rounded p-2 border border-gray-400 col-span-2" autoComplete="off"
                        name="last_name" id="last_name" value={formData.last_name} placeholder="Enter Last Name" onChange={handleChange}
                        required />
                </div>
                
                <div className='m-2 grid grid-cols-3 gap-2'>
                    <label htmlFor="first_name" className='pt-2'>First Name:</label>
                    <input type="text" className="w-full rounded p-2 border border-gray-400 col-span-2" autoComplete="off"
                        name="first_name" id="first_name" value={formData.first_name} placeholder="Enter First Name" onChange={handleChange}
                        required />
                </div>
                
                <div className='m-2 grid grid-cols-3 gap-2'>
                    <label htmlFor="middle_name" className='pt-2'>Middle Name:</label>
                    <input type="text" className="w-full rounded p-2 border border-gray-400 col-span-2" autoComplete="off"
                        name="middle_name" id="middle_name" value={formData.middle_name} placeholder="Enter Middle Name" onChange={handleChange} />
                </div>
                
                <div className='m-2 grid grid-cols-3 gap-2'>
                    <label htmlFor="nickname" className='pt-2'>Nickname:</label>
                    <input type="text" className="w-full rounded p-2 border border-gray-400 col-span-2" autoComplete="off"
                        name="nickname" id="nickname" value={formData.nickname} placeholder="Enter Nickname" onChange={handleChange} />
                </div>
                
                <div className='m-2 grid grid-cols-3 gap-2'>
                    <label htmlFor="username" className='pt-2'>Username:</label>
                    <input type="text" className="w-full rounded p-2 border border-gray-400 col-span-2" autoComplete="off"
                        name="username" id="username" value={formData.username} placeholder="Enter Username" onChange={handleChange}
                        required />
                    {formError.username ? <span className='text-right col-span-3 text-red-500 text-sm'>{ formError.username }</span> : ''}
                </div>

                <div className='m-2 grid grid-cols-3 gap-2'>
                    <label htmlFor="email" className='pt-2'>Email:</label>
                    <input type="email" className="w-full rounded p-2 border border-gray-400 col-span-2" autoComplete="off"
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
                                {formError.password ? <span className='text-right col-span-3 text-red-500 text-sm'>{ formError.password }</span> : ''}
                            </div>
                            
                            <div className='m-2 grid grid-cols-3 gap-2'>
                                <label htmlFor="passwordConfirmation" className='pt-2'>Confirm Password:</label>
                                <input type="password" className="w-full rounded p-2 border border-gray-400 col-span-2" 
                                    name="passwordConfirmation" id="passwordConfirmation" value={passwordConfirmation} placeholder="Confirm Password" onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    required />
                                {formError.passwordConfirmation ? <span className='text-right col-span-3 text-red-500 text-sm'>{ formError.passwordConfirmation }</span> : ''}
                            </div>
                        </> : ''
                }
                
                <div className='m-2'>
                    <button type="submit" className='w-full bg-blue-800 text-white mt-4 p-2 rounded'>Save Current Changes</button>
                </div>
            </form>
        </div>
    )
}

export default UserForm
