import React from "react";

import EmployeeView from "./EmployeeView";
import { useNavigate } from "react-router-dom";

export const EmployeeButton = ({Id}) => {
    const navigate = useNavigate();
    return (
        <div className="flex gap-2 py-2">
          <button className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white px-3 py-1 rounded text-sm"
          onClick={() => {
            navigate(`/admin-dashboard/employee/view/${Id}`)
          }}
          >
            View
          </button>

          <button 
          className="bg-green-500 hover:bg-green-700 cursor-pointer text-white px-3 py-1 rounded text-sm"
          onClick={() => {
            navigate(`/admin-dashboard/employee/edit/${Id}`)
          }}
          >
            Edit
          </button>

          <button className="bg-yellow-500 hover:bg-yellow-700 cursor-pointer text-white px-3 py-1 rounded text-sm"
          onClick={() => {
            navigate(`/admin-dashboard/employee/salary/${Id}`)
          }}
          >
            Salary
          </button>

          <button className="bg-red-500 hover:bg-red-700 cursor-pointer text-white px-3 py-1 rounded text-sm"
          onClick={() => {
            navigate(`/admin-dashboard/employee/leaves/${Id}`)
          }}
          >
            Leave
          </button>
        </div>
    )
}