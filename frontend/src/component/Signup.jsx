import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setauthuser } from "../redux/userSlice";
import axios from "axios";
const Signup = () => {
  const [firstname, setfirstname] = useState();
  const [lastname, setlastname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleform = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      return toast.error("Password doesn't match!");
    }

    try {
      const res = await axios.post('http://localhost:3000/api/v1/users/register', {
        firstname, lastname, email, password
      });
      console.log(res.data);
      dispatch(setauthuser(res.data))
      toast.success("Register success");
      navigate('/')

    } catch (error) {
      console.log(error)
      return toast.error(error.response.data.message)
    }
    return;
  }
  return (
    <div className="h-screen grid justify-center items-center">
      <div className=" w-96 border inline-grid m-2 p-5">
        <h1 className=" mb-3">Sign Up</h1>
        <form onSubmit={(e) => handleform(e)}>
          <div className='grid '>
            <label className="label">First Name:</label>
            <input className='w-full input input-bordered' type="text" placeholder="Enter FirstName" id='firstname' onChange={(e) => setfirstname(e.target.value)} />
            <label className="label">Last Name:</label>
            <input className='w-full input input-bordered' type="text" placeholder="Enter LastName" id='lastname' onChange={(e) => setlastname(e.target.value)} />
            <label className="label">Email-ID:</label>
            <input className='w-full input input-bordered' type="email" placeholder="Enter Email Id" id='email' onChange={(e) => setemail(e.target.value)} />
            <label className="label">Enter password: </label >
            <input className='w-full input input-bordered' type="password" placeholder="Enter password" id='password' onChange={(e) => setpassword(e.target.value)} />
            <label className="label" >Confirm password :</label>
            <input className='w-full input input-bordered' type="password" placeholder="Confirm password" id='confirmPassword' onChange={(e) => setconfirmPassword(e.target.value)} />
            <button className=" mx-auto my-3 btn btn-accent">Signup</button>
          </div>
        </form>

        <Link to='/login' className="text-wrap text-green-300 font-bold ">Already a user? Login</Link>
      </div>
    </div>
  )
}

export default Signup