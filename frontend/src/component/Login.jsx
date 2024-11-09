import { useState } from "react";
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setauthuser } from "../redux/userSlice";
import { toast } from "react-toastify";

const Login = () => {
    const [loginuser, setloginuser] = useState({});
    const dispatch = useDispatch()

    const handlelogin = (e) => {
        e.preventDefault();
        dispatch(setauthuser(loginuser))
        toast.success("Success Notification !");

    }
    const handlechange = (e) => {
        setloginuser({ ...loginuser, [e.target.id]: e.target.value })
    }
    return (
        <div className="h-screen grid justify-center items-center">
            <div className=" w-96 border inline-grid m-2 p-5">
                <h1 className=" mb-3">SIGN IN</h1>
                <form onSubmit={(e) => { handlelogin(e) }}  >
                    <div className='grid '>

                        <label className="label">Email-ID: </label>
                        <input className='w-full input input-bordered' id='email' type="text" placeholder="Enter Email ID" onChange={(e) => { handlechange(e) }} />
                        <label className="label">Enter password: </label >
                        <input className='w-full input input-bordered' id='password' type="password" placeholder="Enter password:" onChange={(e) => { handlechange(e) }} />
                        <button type='submit' className=" mx-auto my-3 btn btn-accent">Login</button>
                    </div>
                </form>

                <Link to='/signup' className="text-wrap hover:text-green-400 text-green-300 font-bold ">New User ? Create New Account</Link>
            </div>
        </div>)
}

export default Login