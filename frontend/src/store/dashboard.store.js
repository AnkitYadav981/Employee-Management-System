import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import AddDepartment from "../components/department/AddDepartment";

export const dashboardStore = create((set) => ({
  fetchEmployeeDashboardSummary: async () => {
    try {
      const res = await axiosInstance.get("/dashboard/employee-dashboard-summary");
      console.log("Employee Dashboard summary fetched successfully:", res);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
}));
