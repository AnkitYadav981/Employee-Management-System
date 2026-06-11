import { Link, useParams  } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore.js";
import { useEffect, useState } from "react";

const LeaveList = () => {
    const {fetchLeaves, authUser} = useAuthStore();
    const [leaves, setLeaves] = useState([]);
    let sno = 1;
    const{id} = useParams();

    useEffect(() => {
        const fetch = async () => {
            if (!id) return;
            const response = await fetchLeaves(id);
            console.log("LeaveList rendered");
            console.log("response",response)
            if (response?.data?.success) {
                setLeaves(response.data.leaves);
            }
        }
        fetch();

    }, [id]);

  return (
  <div className="p-6 bg-gray-100 min-h-screen">
    <h1 className="text-2xl font-bold text-center mb-8">
        Manage Leaves 
    </h1>

    {/* Search + Button */}
    <div className="flex items-center justify-between mb-5">
      <input
      type="text"
      // placeholder="Search By Employee ID"
      // // value={searchText}
      // // onChange={filterEmployees}
      // className="w-72 px-4 py-1 border border-gray-800 rounded outline-none bg-white"
      disabled
      />
    {authUser.role == "user" && (
      <Link
      to="/employee-dashboard/leaves/add-new-leave"
      className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-1 rounded font-semibold"
      >
        Add New Leave
      </Link>
    )}
    </div>
  {leaves.length === 0 ? (

  <p className="text-center mt-4">No leave records found.</p>

) : (
      <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
              <tr>
                <th className="px-6 py-3">SNO</th>
                <th className="px-6 py-3">Leave Type</th>
                <th className="px-6 py-3">From</th>
                <th className="px-6 py-3">To</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Applied Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {leaves.map((leave) => (
                <tr
                key={leave._id}
                className="bg-white border-b "
                >
                  <td className="px-6 py-3">{sno++}</td>

                  <td className="px-6 py-3">
                    {leave.leaveType}
                  </td>

                  <td className="px-6 py-3">
                    {new Date(leave.startDate).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-3">
                    {new Date(leave.endDate).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-3">
                    {leave.reason}
                  </td>

                  <td className="px-6 py-3">
                    {new Date(leave.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-3">
                    {leave.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
  </div>
  );
};

export default LeaveList;