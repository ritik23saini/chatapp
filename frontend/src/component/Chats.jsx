import { useSelector } from "react-redux"

const Chats = () => {
    const authuser = useSelector(state => state.authuser);
    return (
        <div className=" border text-2xl">
            <div className=" overflow-auto p-2 border-r-red-400 border">
                <div className=' flex items-center justify-between'>
                    <img className='w-10' src={authuser?.profilePhoto} alt={`${authuser?.username}'s profile`} />
                    <p className>{authuser?.username}</p>


                </div>
            </div>
        </div>
    )
}

export default Chats