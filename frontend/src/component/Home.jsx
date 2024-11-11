import { useSelector } from 'react-redux';

import SidebarUsers from "./SidebarUsers"
import Chats from './Chats';
const Home = () => {
    const { _id } = useSelector(state => state.authuser);
    const users = useSelector(state => state.otheruser);

    return (

        <div className=" h-screen w-full flex text-center justify-center items-center" >
            <div className='  items-center  gap-2  text-white'>
                <SidebarUsers _id={_id} users={users} />
                <Chats/>

            </div>
        </div >


    )
}

export default Home