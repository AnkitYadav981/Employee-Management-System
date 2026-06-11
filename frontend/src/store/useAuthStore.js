import {create} from "zustand";
import { axiosInstance } from '../lib/axios';
import toast from "react-hot-toast";
import AddDepartment from "../components/department/AddDepartment";


export const useAuthStore = create((set) => ({
    authUser: null,
    departmentsList : [],
    employeesList : [],
    // error: null,
    checkAuth : async () => {
        try {
            console.log("Auth check successful:");
            const res = await axiosInstance.get("/check");
            console.log("Auth check successful:", res);
            set({ authUser: res.data });
            return res;
        } catch (error) {
            console.log("Error checking auth:", error);
            set({ authUser: null });
        }
    },
    login : async (formData) => {
        try {
            const res = await axiosInstance.post("/login", formData);
            console.log("Login successful:", res);
            set({ authUser: res.data });
            toast.success("Login successful!");
            return res;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
            console.log("Error logging in:", errorMessage);
            toast.error(errorMessage);
        }
    },
    logOut : async () => {
        try {
            await axiosInstance.post("/logout", );
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed. Please try again.");
            console.log("Error logging in:", error);
        }
    },
    createDepartment: async (departmentData) => {
        try {
            const res = await axiosInstance.post("/department/add", departmentData);
            console.log("Department added successfully:", res);
            toast.success("Department added successfully!");
            return {success : true , message : "departement created successfully"}
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to add department. Please try again.";
            console.log("Error adding department:", errorMessage);
            toast.error(errorMessage);
            return {success : false , message : "Failed to Create department"}
        }
    },
    fetchDepartments: async () => {
        try {
            const res = await axiosInstance.get("/department");
            console.log("Departments fetched successfully:", res);
            set({ departmentsList: res.data });
            return res.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to fetch departments. Please try again.";
            console.log("Error fetching departments:", errorMessage);
            toast.error(errorMessage);
            return [];
        }
    },
    deleteDepartment: async (departmentId) => {
        try{
            const res = await axiosInstance.delete(`/department/delete/${departmentId}`);
            console.log("Department deleted successfully:", res);
            toast.success("Department deleted successfully!");
            return {success : true , message : "Department deleted successfully"}
        }
        catch(error){
            const errorMessage = error.response?.data?.message || "Failed to fetch departments. Please try again.";
            console.log("Error fetching departments:", errorMessage);
            toast.error(errorMessage);
        }
    },
    editDepartment: async (departmentId, departmentData) => {
        try{
            const res = await axiosInstance.patch(`/department/edit/${departmentId}`, departmentData);
            console.log("Department updated successfully:", res);
            toast.success("Department updated successfully!");
            return {success : true , message : "Department updated successfully"}
        }
        catch(error){
            const errorMessage = error.response?.data?.message || "Failed to fetch departments. Please try again.";
            console.log("Error fetching departments:", errorMessage);
            toast.error(errorMessage);
        }
    },
    updateDepartment: async (departmentId, departmentData) => {
        try{
            const res = await axiosInstance.patch(`/department/edit/${departmentId}`, departmentData);
            console.log("Department updated successfully:", res);
            toast.success("Department updated successfully!");
            return {success : true , message : "Department updated successfully"}
        }catch(error){
            const errorMessage = error.response?.data?.message || "Failed to update department. Please try again.";
            console.log("Error updating department:", errorMessage);
            toast.error(errorMessage);
            return {success : false , message : "Failed to update department"}
        }
    },
    addEmployee: async (employeeData) => {
        try {
            const res = await axiosInstance.post("/employee/add", employeeData);
            console.log("Employee added successfully:", res);
            toast.success("Employee added successfully!");
            return {success : true , message : "Employee added successfully"}
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to add employee. Please try again.";
            console.log("Error adding employee:", errorMessage);
            toast.error(errorMessage);
            return {success : false , message : "Failed to add employee"}
        }
    },
    fetchAllEmployees: async () => {
        try {
            const res = await axiosInstance.get("/employee/getAll");
            console.log("Employees fetched successfully:", res);
            set({ employeesList: res.data });
            return res.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to fetch employees. Please try again.";
            console.log("Error fetching employees:", errorMessage);
            toast.error(errorMessage);
            return [];
        }
    },
    fetchEmployee : async (employeeId) => {
        try {
            const res = await axiosInstance.get(`/employee/view/${employeeId}`);
            console.log("Employee fetched successfully:", res);
            return res;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to fetch employee. Please try again.";
            console.log("Error fetching employee:", errorMessage);
            toast.error(errorMessage);
            return [];
        }
    },
    updateEmployee : async (employeeId, employeeData) => {
        try{
            const res = await axiosInstance.patch(`/employee/edit/${employeeId}`, employeeData);
            console.log("Employee updated successfully:", res);
            toast.success("Employee updated successfully!");
            return {success : true , message : "Employee updated successfully"}
        }catch(error){
            const errorMessage = error.response?.data?.message || "Failed to update employee. Please try again.";
            console.log("Error updating employee:", error);
            toast.error(errorMessage);
            return {success : false , message : "Failed to update employee"}
        }
    },
    getEmployeeForSalary : async (departmentId) => {
        try {
            const res = await axiosInstance.get(`/employee/department/${departmentId}`);
            console.log("Employee fetched successfully:", res);
            if (res.data.success) {
                return res.data.employees;
            }
            
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to fetch employee. Please try again.";
            console.log("Error geting Employee For Salary :", errorMessage);
            toast.error(errorMessage);
            return [];
        }
    },
    addSalary : async (salary) => {
        try {
            const res = await axiosInstance.post(`/salary/add`,salary);
            console.log("Salary Added successfully:", res);
            return res
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to Add Salary. Please try again.";
            console.log("Error Adding Salary :", error);
            toast.error(errorMessage);
            return null;
        }
    },
    fetchSalareis : async (id) => {
        try {
            const res = await axiosInstance.get(`/salary/${id}`,);

            console.log(res.data);

            return res;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to fetch salary. Please try again.";
            console.log("Error fetching Salary :", error);
            toast.error(errorMessage);
            return null;
        }
    },
    addLeave : async (leaveData) => {
        try {
            const res = await axiosInstance.post(`/leaves/add`,leaveData);

            console.log(res.data);

            return res;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to add leave. Please try again.";
            console.log("Error Adding Leave :", error);
            toast.error(errorMessage);
            return null;
        }
    },
    fetchLeaves : async (leaveId) => {
        try {
            const res = await axiosInstance.get(`/leaves/${leaveId}`);
            console.log(res.data);

            return res;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to fetch leave. Please try again.";
            console.log("Error fetching Leaves :", error);
            toast.error(errorMessage);
            return null;
        }

    },
    changePassword : async (passwordData) => {
        try {
            const res = await axiosInstance.patch(`/setting/change-password`,passwordData);
            console.log(res.data);

            return res;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to change password. Please try again.";
            console.log("Error changing password :", error);
            toast.error(errorMessage);
            return null;
        }
    },
    fetchAllLeavesAsAdmin : async () => {
        try {
            const res = await axiosInstance.get(`/leaves/allLeaves`);
            console.log(res.data);

            return res;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to fetch leaves. Please try again.";
            console.log("Error fetching Leaves :", error);
            toast.error(errorMessage);
            return null;
        }

    },
    changeLeaveStatus : async (leaveId, status) => {
        try {
            const res = await axiosInstance.patch(`/leaves/changeStatus/${leaveId}`,{status});
            console.log(res.data);

            return res;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to change leave status. Please try again.";
            console.log("Error changing leave status :", error);
            toast.error(errorMessage);
            return null;
        }
    },
    fetchLeaveDetails : async (id) => {
        try {
            const res = await axiosInstance.get(`/leaves/details/${id}`);
            console.log(res.data);
            return res;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to fetch leave. Please try again.";
            console.log("Error fetching Leaves :", error);
            toast.error(errorMessage);
            return null;
        }
    }
}));