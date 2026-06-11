import {create} from "zustand";
import { axiosInstance } from '../lib/axios';
import toast from "react-hot-toast";
import AddDepartment from "../components/department/AddDepartment";


export const adminStore = create((set) => ({

    dashboardSummary : async () => {
        try {
            const res = await axiosInstance.get("/dashboard/summary");
            console.log("Dashboard summary fetched successfully:", res);
            return res;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to fetch dashboard summary. Please try again.";
            console.log("Error fetching dashboard summary:", errorMessage);
            toast.error(errorMessage);
            return [];
        }
    }

}));