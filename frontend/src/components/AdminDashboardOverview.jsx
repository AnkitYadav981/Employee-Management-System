import React, { useEffect } from "react";
import {
  Users,
  Building2,
  BadgeDollarSign,
  FileText,
  CircleCheckBig,
  Hourglass,
  CircleX,
} from "lucide-react";
import SummaryCard from "./SummaryCard.jsx";
import { adminStore } from "../store/admin.store.js";
import toast from "react-hot-toast";


const AdminSummary = () => {
  const [summaryData, setSummaryData] = React.useState(null);
  const { dashboardSummary } = adminStore();

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        // Simulate API call to fetch summary data
        const response = await dashboardSummary();
        setSummaryData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard summary:", error);
        toast.error("Failed to load dashboard summary.");
      }
    };

    fetchSummaryData();
  }, []);
  if (!summaryData) {
    return (
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-8">Loading Dashboard...</h1>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Dashboard Title */}
      <h1 className="text-2xl font-bold mb-8">
        Dashboard Overview
      </h1>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <SummaryCard
          icon={<Users className="text-white w-8 h-8" />}
          title="Total Employees"
          value={summaryData.totalEmployees}
          color="bg-teal-500"
        />

        <SummaryCard
          icon={<Building2 className="text-white w-8 h-8" />}
          title="Total Departments"
          value={summaryData.totalDepartments}
          color="bg-yellow-500"
        />

        <SummaryCard
          icon={<BadgeDollarSign className="text-white w-8 h-8" />}
          title="Monthly Pay"
          value={`$${summaryData.totalSalary?.toLocaleString()}`}
          color="bg-red-500"
        />
      </div>

      {/* Leave Details */}
      <div className="mt-14">
        <h2 className="text-4xl font-bold text-center mb-8">
          Leave Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SummaryCard
            icon={<FileText className="text-white w-8 h-8" />}
            title="Leave Applied"
            value={summaryData.leaveSummary.appliedFor}
            color="bg-teal-500"
          />

          <SummaryCard
            icon={<CircleCheckBig className="text-white w-8 h-8" />}
            title="Leave Approved"
            value={summaryData.leaveSummary.approved}
            color="bg-green-500"
          />

          <SummaryCard
            icon={<Hourglass className="text-white w-8 h-8" />}
            title="Leave Pending"
            value={summaryData.leaveSummary.pending}
            color="bg-yellow-500"
          />

          <SummaryCard
            icon={<CircleX className="text-white w-8 h-8" />}
            title="Leave Rejected"
            value={summaryData.leaveSummary.rejected}
            color="bg-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;