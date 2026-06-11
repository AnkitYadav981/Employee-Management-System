import React from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { Link } from 'react-router-dom';

function NavBar() {
    const {authUser,logOut} = useAuthStore();
  return (
    <header className=" bg-teal-500 text-white h-12 flex px-5 justify-between items-center">
        <div className="flex items-center h-12 justify-between w-full">
            <div>
                Welcome, {authUser?.name} 
            </div>
        </div>
            <div className='px-4 py-2 bg-teal-700 rounded-2xl hover:bg-teal-600 transition-colors duration-300 ease-in-out text-white'
            onClick={logOut}
            >
                <Link to={"/logout"}>
                Logout
                </Link>
            </div>
    </header>
  )
}

export default NavBar