import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";
import { IMAGE_BASE_URL } from '../../img_URL/img_Url';

function LeaveDetails() {
    // const IMAGE_BASE_URL = "http://localhost:3000/uploads/";
    const { id } = useParams();
    const { fetchLeaveDetails, changeLeaveStatus } = useAuthStore();
    const navigate = useNavigate();
    const [leave, setLeave] = useState(null);
    
    console.log("Component rendered, id:", id);
    const changeStatus = async (id, status) => {
        console.log("Changing status for id:", id, "to", status);
        const res = await changeLeaveStatus(id, status);
        console.log("Response from changeLeaveStatus:", res);
        if (res?.data?.success) {
            navigate("/admin-dashboard/leaves")
            toast.success("Leave status updated successfully");
        } else {
            toast.error("Failed to update leave status");
        }
    }
    useEffect(()=>{
        console.log("Fetching leave with id:", id)
        const fetch = async () => {
        try {
            console.log("Fetching leave with id:", id)
            // const resp = await fetchLeaves(id);
            // console.log("resp",resp)
            const res = await fetchLeaveDetails(id);
            console.log("response on leave View",res)
            if (res.data.success) {
            setLeave(res.data.leaves);
            }
        } catch (error) {
            console.log("Error viewing leave:", error);
            toast.error("Failed to fetch leave");
        }
        };
        fetch();
    },[id])

    console.log("leave1", leave);
//   console.log("leave2", leave.userId?.profileImage);

  return (
    <>{leave? (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-3xl font-bold mb-10 text-center">Leave Details</h2>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <div className="flex justify-center ">
          <img
            src={`${IMAGE_BASE_URL}/${leave.employeeId?.userId?.profileImage}`}
            className="w-72 h-72 rounded-full border object-cover"
            alt=""
          />
        </div>

        <div className="space-y-4">
            <div className="flex gap-3">
                <p className="text-lg font-bold">Name:</p>
                <p className="text-lg">{leave.employeeId?.userId?.name}</p>
            </div>
            <div className="flex gap-3">
                <p className="text-lg font-bold">Employee ID:</p>
                <p className="text-lg">{leave.employeeId?.employeeId}</p>
            </div>
            <div className="flex gap-3">
                <p className="text-lg font-bold">Leave Type:</p>
                <p className="text-lg">{leave.leaveType}</p>
            </div>
            <div className="flex gap-3">
                <p className="text-lg font-bold">Reason:</p>
                <p className="text-lg">{leave.reason}</p>
            </div>
            <div className="flex gap-3">
                <p className="text-lg font-bold">Department:</p>
                <p className="text-lg">
                {leave.employeeId?.department?.departmentName}
                </p>
            </div>
            <div className="flex gap-3">
                <p className="text-lg font-bold">Start Date:</p>
                <p className="text-lg">{new Date (leave.startDate).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-3">
                <p className="text-lg font-bold">End Date:</p>
                <p className="text-lg">{new Date (leave.endDate).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-3">
                <p className="text-lg font-bold">
                    {leave.status == "Pending" ? "Action:" : "Status:"}
                    </p>
                    {leave.status == "Pending" ? (
                        <div className="flex space-x-2">
                            <button className="px-2 py-0.5 bg-teal-300 hover:bg-teal-400 rounded cursor-pointer"
                            onClick={() => changeStatus(leave._id, "Approved")}
                            >Approve</button>
                            <button className="px-2 py-0.5 bg-red-300 hover:bg-red-400 rounded cursor-pointer" 
                            onClick={() => changeStatus(leave._id, "Rejected")}
                            >Reject</button>
                        </div>
                    ): 
                        <p className="text-lg">{leave.status}</p>
                    }
            </div>

        </div>
      </div>
    </div>
    ): <div>Loading... </div> }
    </>

  );
}

export default LeaveDetails;
