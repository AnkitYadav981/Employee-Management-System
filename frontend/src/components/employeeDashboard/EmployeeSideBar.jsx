import React from 'react'
import { FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUser, FaUsers } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore.js';

function EmployeeSideBar() {
    const {authUser} = useAuthStore();
  return (
    <>
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col fixed space-y-2">
        <div className="flex items-center bg-teal-500 h-12  justify-center max-w-sm w-full">
                <Link to="/">
                    <h3 className=' text-4xl  font-dancing'>Employee MS</h3>
                </Link>
        </div>
        <div className='px-4'>

            <NavLink to="/employee-dashboard" end className={({isActive}) => `${isActive ? "bg-teal-500" : "hover:bg-gray-700"} flex items-center space-x-4 px-4 py-2.5 rounded `}>

                <FaTachometerAlt 
                className="inline-block m-2 size-5" 
                />
                <span 
                className="text-xl font-semibold"
                >Dashboard</span>
            </NavLink>


            <NavLink to={`/employee-dashboard/profile/${authUser._id}`} className={({isActive}) => `${isActive ? "bg-teal-500" : "hover:bg-gray-700"} flex items-center space-x-4 px-4 py-2.5 rounded `}>
                <FaUsers className="inline-block m-2 size-5" />
                <span className="text-lg font-semibold">My Profile</span>
            </NavLink>
            <NavLink to={`/employee-dashboard/leaves/${authUser._id}`} className={({isActive}) => `${isActive ? "bg-teal-500" : "hover:bg-gray-700"} flex items-center space-x-4 px-4 py-2.5 rounded `}>
                <FaCalendarAlt className="inline-block m-2 size-5" />
                <span className="text-lg font-semibold">Leaves</span>
            </NavLink>
            <NavLink to={`/employee-dashboard/salary/${authUser._id}`} className={({isActive}) => `${isActive ? "bg-teal-500" : "hover:bg-gray-700"} flex items-center space-x-4 px-4 py-2.5 rounded `}>
                <FaMoneyBillWave className="inline-block m-2 size-5" />
                <span className="text-lg font-semibold">Salary</span>
            </NavLink>
            <NavLink to="/employee-dashboard/settings" className={({isActive}) => `${isActive ? "bg-teal-500" : "hover:bg-gray-700"} flex items-center space-x-4 px-4 py-2.5 rounded `}>
                <FaCogs className="inline-block m-2 size-5" />
                <span className="text-lg font-semibold">Settings</span>
            </NavLink>
        </div>
    </div>

    </>
  )
}

export default EmployeeSideBar