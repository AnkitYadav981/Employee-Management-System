import React from 'react'
import { FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUser, FaUsers } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';

function AdminSideBar() {
  return (
    <>
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col fixed space-y-2">
        <div className="flex items-center bg-teal-500 h-12  justify-center max-w-sm w-full">
                <Link to="/">
                    <h3 className=' text-4xl  font-dancing'>Employee MS</h3>
                </Link>
        </div>
        <div className='px-4'>

            <NavLink to="/admin-dashboard" end className={({isActive}) => `${isActive ? "bg-teal-500" : "hover:bg-gray-700"} flex items-center space-x-4 px-4 py-2.5 rounded `}>

                <FaTachometerAlt 
                className="inline-block m-2 size-5" 
                />
                <span 
                className="text-xl font-semibold"
                >Dashboard</span>
            </NavLink>


            <NavLink to="/admin-dashboard/employees" className={({isActive}) => `${isActive ? "bg-teal-500" : "hover:bg-gray-700"} flex items-center space-x-4 px-4 py-2.5 rounded `}>
                <FaUsers className="inline-block m-2 size-5" />
                <span className="text-lg font-semibold">Employee</span>
            </NavLink>
            <NavLink to="/admin-dashboard/departments" className={({isActive}) => `${isActive ? "bg-teal-500" : "hover:bg-gray-700"} flex items-center space-x-4 px-4 py-2.5 rounded `}>
                <FaBuilding className="inline-block m-2 size-5" />
                <span className="text-lg font-semibold">Department</span>
            </NavLink>
            <NavLink to="/admin-dashboard/leaves" className={({isActive}) => `${isActive ? "bg-teal-500" : "hover:bg-gray-700"} flex items-center space-x-4 px-4 py-2.5 rounded `}>
                <FaCalendarAlt className="inline-block m-2 size-5" />
                <span className="text-lg font-semibold">Leaves</span>
            </NavLink>
            <NavLink to="/admin-dashboard/salary/add" className={({isActive}) => `${isActive ? "bg-teal-500" : "hover:bg-gray-700"} flex items-center space-x-4 px-4 py-2.5 rounded `}>
                <FaMoneyBillWave className="inline-block m-2 size-5" />
                <span className="text-lg font-semibold">Salary</span>
            </NavLink>
            <NavLink to="/admin-dashboard/settings" className={({isActive}) => `${isActive ? "bg-teal-500" : "hover:bg-gray-700"} flex items-center space-x-4 px-4 py-2.5 rounded `}>
                <FaCogs className="inline-block m-2 size-5" />
                <span className="text-lg font-semibold">Settings</span>
            </NavLink>
        </div>
    </div>

    </>
  )
}

export default AdminSideBar