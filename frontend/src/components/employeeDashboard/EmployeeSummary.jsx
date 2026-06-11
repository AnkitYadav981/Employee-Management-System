import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
  FaRegCheckCircle,
  FaTimesCircle,
  FaRegTimesCircle
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore.js";
import { dashboardStore } from "../../store/dashboard.store.js";

const EmployeeSummary = () => {
  const { authUser } = useAuthStore();
  const [dashboardData, setDashboardData] = useState(null);
  const { fetchEmployeeDashboardSummary } = dashboardStore();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchEmployeeDashboardSummary();

      if (response?.data?.success) {
        setDashboardData(response.data.dataSummary);
      }
    };

    fetchData();
  }, []);
  console.log("Employee Dashboard Data:", dashboardData);

  // Hardcoded Dashboard Data
  // const dashboardData = {
  //   summary: {
  //     totalLeaves: 12,
  //     pendingLeaves: 2,
  //     approvedLeaves: 8,
  //   },

  //   salary: {
  //     netSalary: 50000,
  //     payDate: "31-May-2026",
  //   },

  //   employeeInfo: {
  //     employeeId: "EMP001",
  //     department: "IT",
  //     designation: "Frontend Developer",
  //     joiningDate: "01-Jan-2026",
  //   },

  //   recentActivities: [
  //     {
  //       id: 1,
  //       title: "Casual Leave Approved",
  //       date: "05-Jun-2026",
  //       color: "green",
  //     },
  //     {
  //       id: 2,
  //       title: "Sick Leave Pending",
  //       date: "12-Jun-2026",
  //       color: "yellow",
  //     },
  //     {
  //       id: 3,
  //       title: "Salary Credited - ₹50,000",
  //       date: "31-May-2026",
  //       color: "blue",
  //     },
  //   ],
  // };

  return (
    <>
      {!dashboardData ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 text-lg">Loading dashboard...</p>
        </div>
      ) : (
        <div className="p-6 space-y-6">
          {/* Welcome Card */}
          <div className="bg-white flex items-center shadow-sm rounded-lg overflow-hidden">
            <div className="w-24 h-24 flex items-center justify-center bg-teal-500">
              <FaUser className="text-white text-3xl" />
            </div>

            <div className="px-6">
              <h3 className="text-xl font-medium text-gray-700">
                Welcome Back
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {authUser?.name}
              </p>
              <p className="text-gray-500">
                {dashboardData.employeeInfo.designation} •{" "}
                {dashboardData.employeeInfo.department} Department
              </p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="bg-white rounded-lg shadow p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Total Leaves</p>
                  <h2 className="text-3xl font-bold">
                    {dashboardData.summary.totalLeaves}
                  </h2>
                </div>
                <FaCalendarCheck className="text-3xl text-teal-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Pending</p>
                  <h2 className="text-3xl font-bold text-yellow-500">
                    {dashboardData.summary.pendingLeaves}
                  </h2>
                </div>
                <FaClock className="text-3xl text-yellow-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Approved</p>
                  <h2 className="text-3xl font-bold text-green-600">
                    {dashboardData.summary.approvedLeaves}
                  </h2>
                </div>
                <FaCheckCircle className="text-3xl text-green-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Rejected</p>
                  <h2 className="text-3xl font-bold text-red-600">
                    {dashboardData.summary.rejectedLeaves}
                  </h2>
                </div>

                <FaTimesCircle className="text-3xl text-red-600" />
              </div>
            </div>
          </div>

          {/* Salary + Employee Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Last Salary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Last Salary Paid</h2>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Amount</p>
                  <h3 className="text-4xl font-bold text-green-600">
                    ₹{dashboardData.salary.netSalary.toLocaleString()}
                  </h3>
                </div>

                <FaMoneyBillWave className="text-5xl text-green-500" />
              </div>

              <p className="mt-4 text-gray-600">
                Payment Date: {dashboardData.salary.payDate}
              </p>
            </div>

            {/* Employee Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Employee Information</h2>

              <div className="space-y-3">
                <p>
                  <span className="font-semibold">Employee ID:</span>{" "}
                  {dashboardData.employeeInfo.employeeId}
                </p>

                <p>
                  <span className="font-semibold">Department:</span>{" "}
                  {dashboardData.employeeInfo.department}
                </p>

                <p>
                  <span className="font-semibold">Designation:</span>{" "}
                  {dashboardData.employeeInfo.designation}
                </p>

                <p>
                  <span className="font-semibold">Joining Date:</span>{" "}
                  {dashboardData.employeeInfo.joiningDate}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/employee-dashboard/leaves/add-new-leave"
                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
              >
                Apply Leave
              </Link>

              <Link
                to={`/employee-dashboard/salary/${authUser?._id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                View Salary
              </Link>

              <Link
                to={`/employee-dashboard/profile/${authUser?._id}`}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
              >
                My Profile
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>

            <div className="space-y-4">
              {dashboardData.recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className={`border-l-4 pl-4 ${
                    activity.color === "green"
                      ? "border-green-500"
                      : activity.color === "yellow"
                      ? "border-yellow-500"
                      : "border-blue-500"
                  }`}
                >
                  <p className="font-semibold">{activity.title}</p>

                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeSummary;
