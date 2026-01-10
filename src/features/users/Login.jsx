import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from './userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('jollycasfer')
    const [password, setPassword] = useState('1234567890')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loggedIn = useSelector((state) => state.user.loggedIn);
    const name = useSelector((state) => state.user.username);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            username: username,
            password: password
        };

        await dispatch(login(formData)).unwrap();
    }

    useEffect(() => {
    }, [dispatch])

    useEffect(() => {
        if (loggedIn) {
            navigate('/');
        }
    }, [loggedIn])

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)} value={username} />
                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login
