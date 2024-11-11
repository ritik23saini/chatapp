/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setotheruser } from '../redux/userSlice';
import { Link } from 'react-router-dom'
import { clearStore } from '../redux/userSlice';
import { toast } from 'react-toastify'
const SidebarUsers = ({ _id, users }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getotheruser = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/v1/getAllUsers/${_id}`);
                dispatch(setotheruser(res.data));
            } catch (error) {
                console.log(error);
            }
        };
        if (_id) getotheruser();
    }, [_id, dispatch]);

    const logoutApiHandler = async () => {
        const logout = await axios.post(`http://localhost:3000/api/v1/users/logout`);
        dispatch(clearStore());
        toast.success(logout.data.message)
    }

    return (
        <div>
            <div className="w-auto h-96 overflow-auto p-2 border-r-red-400 border">
                <input className="input h-fit input-bordered" placeholder="Search" />
                <div className="grid gap-2">
                    {users?.map((user) => (
                        <div className=' inline-flex text-black rounded-md  bg-white hover:bg-slate-400 p-3 mt-2 gap-2 justify-between items-center' key={user._id}>
                            <img className='w-10 ' src={user.profilePhoto} alt={`${user.username}'s profile`} />
                            <div className="divider divider-horizontal"></div>
                            <p className>{user.username}</p>


                        </div>
                    ))}

                </div>
                <Link className='text-center bg-white hover:bg-slate-400 mt-4 inline-flex justify-center text-black rounded-md px-3' to='/login' onClick={logoutApiHandler}>Logout</Link>
            </div>

        </div>
    );
};

export default SidebarUsers;
