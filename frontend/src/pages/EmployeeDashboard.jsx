import React from 'react'
import { Outlet } from 'react-router-dom';

import NavBar from '../components/NavBar.jsx';
import EmployeeSideBar from '../components/employeeDashboard/EmployeeSideBar.jsx';

function EmployeeDashboard() {

  return (
    <div className='flex'> 
    {/*  TODO remove bg-gray-100 */}
      <EmployeeSideBar />
      <div className='flex-1 ml-64 bg-gray-100 h-screen'> 
        {/* // TODO make bg-gray-900 to bg-gray-100 */}
        <NavBar />
        <Outlet />
      </div>
      
    </div>
  )
}

export default EmployeeDashboard