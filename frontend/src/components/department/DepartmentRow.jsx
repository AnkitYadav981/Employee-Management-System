import { Pencil, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore.js';
import EditDepartment from './EditDepartment.jsx';


export const DepartmentRow = ({department,index}) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleEdit = () => {
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
  };

    const {deleteDepartment,fetchDepartments} = useAuthStore();
    const handleDelete = async () => {
        await deleteDepartment(department._id);
        await fetchDepartments();
        console.log("Delete department with id:", department._id);
    };

  return (
    <>
        
              <tr
                key={department._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-5 py-4 text-gray-700">
                  {index + 1}
                </td>

                <td className="px-5 py-4 text-gray-700">
                  {department.departmentName}
                </td>

                <td className="px-5 py-4">
                  <div className="flex gap-3">
                    <button onClick={handleEdit} className="flex items-center gap-1 bg-green-400 hover:bg-green-500 text-white px-4 py-1 rounded">
                    {/* <Link to={`/admin-dashboard/departments/edit/${department._id}`}> */}
                      <Pencil size={16} />
                        Edit
                    {/* </Link> */}
                    </button>

                    <button onClick={handleDelete} className="flex items-center gap-1 bg-red-400 hover:bg-red-500 text-white px-4 py-1 rounded">
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              {showEdit && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-auto">
    <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-lg max-h-[90vh] overflow-y-auto">
      <button
        onClick={handleCloseEdit}
        className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
      >
        ✕
      </button>

      <EditDepartment
        departmentData={department}
        onClose={handleCloseEdit}
        refreshDepartments={fetchDepartments}
      />
    </div>
  </div>
)}
              </>
  );
}