import { Link } from "react-router-dom";
import UserForm from "../components/UserForm.jsx";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Register = () => {
    const user = useSelector((state) => state.user);

    useEffect(() => {
        
    }, [user])
    
    return (
        <div className='w-full sm:w-3/5 md:w-1/3 mx-auto p-5 mt-2 border border-2 border-gray-300'>
            <div className='mx-3 text-center p-5'>
                <h3 className='text-3xl font-bold'>Create an account</h3>
            </div>

            <UserForm />

            <div className="m-2 text-center text-blue-500">
                <Link to="/login">Already have an account? Click here to sign in</Link>
            </div>
            {
                user.error != null ? 
                    <div className="text-center flex justify-center content-center">
                        <h1 className='text-center w-full bg-red-100 border border-2 border-red-500 text-red-800 p-3 mt-4 rounded font-bold'>{ user.error?.message }</h1>
                    </div>
                    : ''
            }
        </div>
    )
}

export default Register
