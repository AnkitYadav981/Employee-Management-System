import React, { useState } from "react";
import  {useAuthStore}  from "../../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
    const navigate = useNavigate();
    const { createDepartment } = useAuthStore();
    const [department, setDepartment] = useState({
        departmentName: "",
        description: "",
    });

    const handleChange = (e) => {

        setDepartment({
        ...department,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const trimmedDepartment = {
                departmentName: department.departmentName.trim(),
                description: department.description.trim(),
            };
            if (trimmedDepartment.departmentName === "" || trimmedDepartment.description === "") {
                alert("All fields are required");
                return;
            }
            const res = await createDepartment(trimmedDepartment);
            if (res.success) {
                navigate("/admin-dashboard/departments");
            }

            console.log(trimmedDepartment);
        } catch (error) {
            alert("Failed to add department. Please try again later.");
            console.error("Error adding department:", error);
        }
        };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-16">
        <div className="bg-white w-full max-w-lg rounded shadow-sm p-8">
            
            {/* Heading */}
            <h1 className="text-2xl font-bold mb-6">
            Add New Department
            </h1>

            {/* Form */}
            <form onSubmit={handleSubmit}>
            
            {/* Department Name */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                Department Name
                </label>

                <input
                type="text"
                name="departmentName"
                placeholder="Department Name"
                value={department.departmentName}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 p-2 outline-none rounded-md focus:border-teal-500"
                />
            </div>

            {/* Description */}
            <div className="mb-8">
                <label className="block text-sm font-medium mb-2">
                Description
                </label>

                <textarea
                rows="5"
                name="description"
                placeholder="Description"
                value={department.description}
                onChange={handleChange}
                required
                className=" mt-1 w-full border border-gray-300 rounded p-2 outline-none resize-none focus:border-teal-500"
                ></textarea>
            </div>

            {/* Button */}
            <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-800 text-white text-xl font-bold py-2 px-4 rounded-md"
            >
                Add Department
            </button>
            </form>
        </div>
        </div>
    );
    };

    export default AddDepartment;