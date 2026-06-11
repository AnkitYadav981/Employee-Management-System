import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const inputStyle = "w-full border rounded-md p-3 outline-none focus:border-teal-500";

const labelStyle = "block mb-2 font-medium";
const selectStyle = "w-full h-[50px] px-3 border rounded-md bg-white outline-none focus:border-teal-500";


const EmployeeAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { fetchDepartments, departmentsList,addEmployee } = useAuthStore();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]); 
    });
    const res = await addEmployee(formDataObj);
    if(res.success){
      navigate('/admin-dashboard/employees');
    } else {
      toast.error("Failed to add employee. Please try again.");
    }
  };


  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white rounded shadow-sm p-10">
        <h1 className="text-3xl font-bold mb-10">
          Add New Employee
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}
            <div>
              <label className={labelStyle}>Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Insert Name"
                className={inputStyle}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className={labelStyle}>Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Insert Email"
                className={inputStyle}
                required
              />
            </div>

            {/* Employee ID */}
            <div>
              <label className={labelStyle}>Employee ID</label>
              <input
                type="text"
                name="employeeId"
                onChange={handleChange}
                placeholder="Employee ID"
                className={inputStyle}
                required
              />
            </div>

            {/* DOB */}
            <div>
              <label className={labelStyle}>Date of Birth</label>
              <input
                type="date"
                name="dob"
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className={labelStyle}>Gender</label>
              <select 
                name="gender" 
                className={selectStyle} 
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Marital Status */}
            <div>
              <label className={labelStyle}>Marital Status</label>
              <select name="maritalStatus" onChange={handleChange} className={selectStyle} required>
                <option value="">Select Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>

            {/* Designation */}
            <div>
              <label className={labelStyle}>Designation</label>
              <input
                type="text"
                name="designation"
                onChange={handleChange}
                placeholder="Designation"
                className={inputStyle}
                required
              />
            </div>

            {/* Department */}
            <div>
              <label className={labelStyle}>Department</label>
              <select name="department" onChange={handleChange} className={selectStyle} placeholder="Select Department" required>
                <option value="">Select Department</option>
                {departmentsList.map((dept) => (
                  // console.log(dept),
                  <option key={dept._id} value={dept._id}>
                    {dept.departmentName}
                  </option>
                ))}
              </select>
            </div>

            {/* Salary */}
            <div>
              <label className={labelStyle}>Salary</label>
              <input
                type="number"
                name="salary"
                onChange={handleChange}
                placeholder="Salary"
                className={inputStyle}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className={labelStyle}>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="******"
                className={inputStyle}
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className={labelStyle}>Role</label>
              <select name="role" onChange={handleChange} className={selectStyle} required>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">Employee</option>
              </select>
            </div>

            {/* Image */}
            <div>
              <label className={labelStyle}>Upload Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                placeholder='Upload Image'
                className={inputStyle}
                accept="image/*"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeAdd;