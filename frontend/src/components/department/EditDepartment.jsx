import React, { useState } from "react";
import  {useAuthStore}  from "../../store/useAuthStore.js";

const EditDepartment = ({ departmentData, onClose, refreshDepartments }) => {
    const { updateDepartment } = useAuthStore();
    console.log("Received department data for editing 2:", departmentData);
    const [updatedDepartment, setUpdatedDepartment] = useState(departmentData);
    console.log("Received department data for editing:", updatedDepartment);

    const handleChange = (e) => {

        setUpdatedDepartment({
        ...updatedDepartment,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const trimmedDepartment = {
                departmentName: updatedDepartment.departmentName.trim(),
                description: updatedDepartment.description.trim(),
            };
            if (trimmedDepartment.departmentName === "" || trimmedDepartment.description === "") {
                alert("All fields are required");
                return;
            }
            const res = await updateDepartment(updatedDepartment._id, trimmedDepartment);
            console.log("Update department response:", res);
            if (res.success) {
                await refreshDepartments();
                onClose();
            }

            console.log(trimmedDepartment);
        } catch (error) {
            alert("Failed to update department. Please try again later.");
            console.error("Error updating department:", error);
        }
        };

    return (
        <div className=" bg-white flex justify-center items-start p-5">
        <div className="bg-white w-full max-w-lg rounded shadow-lg p-8">
            
            {/* Heading */}
            <h1 className="text-2xl font-bold mb-6">
            Edit Department 
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
                value={updatedDepartment.departmentName}
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
                value={updatedDepartment.description}
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
                Edit Department
            </button>
            </form>
        </div>
        </div>
    );
    };

    export default EditDepartment;