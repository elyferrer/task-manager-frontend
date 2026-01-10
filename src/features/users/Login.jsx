import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from './userSlice';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            username: username,
            password: password
        };

        await dispatch(login(formData));
    }

    const handleError = async () => {
        if (user.error != null) {
            await setShowError(true);
        
            setTimeout(() => {
                setShowError(false);
            }, 5000);
        }
    }

    useEffect(() => {
    }, [dispatch])

    useEffect(() => {
        if (user.loggedIn) {
            navigate('/');
        }

        if (user.error !== '') {
            handleError();
        }
    }, [user])

    return (
        <div className='w-full sm:w-3/5 md:w-1/3 mx-auto pt-5 bg-blue-800 p-5 m-3 rounded'>
            <div className='mx-3 text-center p-5'>
                <h3 className='text-3xl font-bold text-white'>Sign In</h3>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="text-center">
                    <input type="text" name="username" id="username" placeholder="Enter Username" className="w-3/4 rounded p-2 border border-gray-400"
                        onChange={(e) => setUsername(e.target.value)} value={username} required />
                </div>

                <div className="text-center">
                    <input type="password" name="password" id="password" placeholder="Enter Password" className="w-3/4 rounded p-2 border border-gray-400 mt-2" 
                        onChange={(e) => setPassword(e.target.value)} value={password} required />
                </div>
                
                <div className="text-center">
                    <button type="submit" className='w-3/4 bg-blue-500 text-white mt-4 p-2 rounded'>Login</button>
                </div>

                <div className="text-center m-3 text-white">
                    <Link to="/register">No account yet? Click here to register</Link>
                </div>

                {
                    showError ? 
                        <div className="text-center flex justify-center content-center">
                            <h1 className='text-center w-3/4 bg-red-300 text-red-800 p-3 mt-4 rounded'>{ user.error?.message }</h1>
                        </div>
                        : ''
                }
                
            </form>
        </div>
    )
}

export default Login
