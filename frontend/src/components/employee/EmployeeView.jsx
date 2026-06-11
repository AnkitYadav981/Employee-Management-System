import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";
import { IMAGE_BASE_URL } from '../../img_URL/img_Url';

function EmployeeView() {
  // const IMAGE_BASE_URL = "http://localhost:3000/uploads/";
  const { id } = useParams();
  const { fetchEmployee } = useAuthStore();
  const [employee, setEmployee] = useState([]);
  
  console.log("Component rendered, id:", id);
  useEffect(()=>{
    const fetch = async () => {
      try {
        console.log("Fetching employee with id:", id)
        const res = await fetchEmployee(id);
        console.log("response on Employee View",res)
        if (res.data.success) {
          setEmployee(res.data.employee);
        }
      } catch (error) {
        console.log("Error viewing employee:", error);
        toast.error("Failed to fetch employee");
      }
    };
    fetch();
  },[id])

  console.log("Employee1", employee);
  console.log("Employee2", employee.userId?.profileImage);

  return (
    <>{employee? (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-3xl font-bold mb-10 text-center">Employee Details</h2>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <div className="flex justify-center ">
          <img
            src={`${IMAGE_BASE_URL}/${employee.userId?.profileImage}`}
            className="w-72 h-72 rounded-full border object-cover"
            alt=""
          />
        </div>

        <div className="space-y-8">
            <div className="flex gap-3">
                <p className="text-lg font-bold">Name:</p>
                <p className="text-lg">{employee.userId?.name}</p>
            </div>

            <div className="flex gap-3">
                <p className="text-lg font-bold">Employee ID:</p>
                <p className="text-lg">{employee.employeeId}</p>
            </div>

            <div className="flex gap-3">
                <p className="text-lg font-bold">Date of Birth:</p>
                <p className="text-lg">
                {new Date(employee.dob).toLocaleDateString()}
                </p>
            </div>

            <div className="flex gap-3">
                <p className="text-lg font-bold">Gender:</p>
                <p className="text-lg">{employee.gender}</p>
            </div>

            <div className="flex gap-3">
                <p className="text-lg font-bold">Department:</p>
                <p className="text-lg">
                {employee.department?.departmentName}
                </p>
            </div>

            <div className="flex gap-3">
                <p className="text-lg font-bold">Marital Status:</p>
                <p className="text-lg">{employee.maritalStatus}</p>
            </div>
        </div>
      </div>
    </div>
    ): <div>Loading... </div> }
    </>

  );
}

export default EmployeeView;
