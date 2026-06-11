import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore.js";
import DataTable from "react-data-table-component/dist/index.es.js";
import { columns, LeaveButtons } from "./LeaveHelper.jsx";

function AdminLeaves() {
  const { fetchAllLeavesAsAdmin, changeLeaveStatus } = useAuthStore();
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  const fetchLeaves = async () => {
    const response = await fetchAllLeavesAsAdmin();
    console.log("AdminLeaves rendered");
    console.log("response", response);
    if (response?.data?.success) {
      let sno = 1;
      const data = response.data.leaves.map((leave) => ({
        _id: leave._id,
        sno: sno++,
        employeeId: leave.employeeId?.employeeId,
        name: leave.employeeId?.userId.name,
        leaveType: leave.leaveType,
        department: leave.employeeId?.department.departmentName,
        days:
          new Date(leave.endDate).getDate() -
          new Date(leave.startDate).getDate(),
        status: leave.status,
        action: <LeaveButtons Id={leave._id} />,
      }));
      setLeaves(data);
      setFilteredLeaves(data);
    }
  };
  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };
  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status
        .toLowerCase()
        .includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-8">Manage Leaves</h1>

      {/* Search + Button */}
      <div className="flex items-center justify-between mb-5">
        <input
          type="text"
          placeholder="Search By Employee ID"
          // value={searchText}
          onChange={filterByInput}
          className="w-72 px-4 py-1 border border-gray-800 rounded outline-none bg-white"
        />
        <div className="space-x-3">
          <button className="px-2 py-1 cursor-pointer bg-teal-600 text-white hover:bg-teal-700 rounded"
          onClick={()=> filterByButton("Pending")}
          >
            Pending
          </button>

          <button className="px-2 py-1 cursor-pointer bg-teal-600 text-white hover:bg-teal-700 rounded"
          onClick={()=> filterByButton("Approved")}
          >
            Approved
          </button>

          <button className="px-2 py-1 cursor-pointer bg-teal-600 text-white hover:bg-teal-700 rounded"
          onClick={()=> filterByButton("Rejected")}
          >
            Rejected
          </button>
        </div>
      </div>
      <DataTable columns={columns} data={filteredLeaves} pagination />
    </div>
  );
}

export default AdminLeaves;
