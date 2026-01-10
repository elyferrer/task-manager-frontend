import { Link } from "react-router-dom";
import UserForm from "../components/UserForm";

const Register = () => {
    
    return (
        <div className='w-full sm:w-3/5 md:w-1/3 mx-auto min-h-screen pt-5'>
            <div className='mx-3 text-center p-5'>
                <h3 className='text-3xl font-bold'>Create an account</h3>
            </div>

            <UserForm />

            <div className="m-2 text-center text-blue-500">
                <Link to="/login">Already have an account? Click here to sign in</Link>
            </div>
        </div>
    )
}

export default Register
