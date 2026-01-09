import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const loggedIn = useSelector((state) => state.user.loggedIn);
    console.log(loggedIn);
    return (
        loggedIn ? 
            <Outlet /> :
            <Navigate to="/login" />
    );
}

export default PrivateRoutes
