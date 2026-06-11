import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const inputStyle =
  "w-full border rounded-md p-3 outline-none focus:border-teal-500";

const labelStyle = "block mb-2 font-medium";

const selectStyle =
  "w-full h-[50px] px-3 border rounded-md bg-white outline-none focus:border-teal-500";

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    designation: "",
    department: "",
    salary: "",
    password: "",
    role: "",
    image: null,
  });

  const {
    fetchDepartments,
    departmentsList,
    fetchEmployee,
    updateEmployee,
  } = useAuthStore();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const loadEmployee = async () => {
    try {
      const res = await fetchEmployee(id);
      const employee = res.data.employee
      console.log("hello",employee)

      if (employee) {
        setFormData({
          name: employee.userId.name || "",
          email: employee.userId.email || "",
          employeeId: employee.employeeId || "",
          dob: employee.dob
            ? new Date(employee.dob).toISOString().split("T")[0]
            : "",
          gender: employee.gender || "",
          maritalStatus: employee.maritalStatus || "",
          designation: employee.designation || "",
          department: employee.department?._id || employee.department || "",
          salary: employee.salary || "",
          password: "",
          role: employee.userId.role || "",
          image: null,
        });
      }
    } catch (error) {
      console.error(error);
      toast.success("Failed to fetch employee details");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObj = new FormData();

      Object.keys(formData).forEach((key) => {
        if (
          key === "image" &&
          (formData[key] === null || formData[key] === "")
        ) {
          return;
        }

        if (
          key === "password" &&
          (formData[key] === null || formData[key] === "")
        ) {
          return;
        }

        formDataObj.append(key, formData[key]);
      });

      const res = await updateEmployee(id, formDataObj);

      if (res.success) {
        // toast.success("Employee updated successfully");
        navigate("/admin-dashboard/employees");
      } else {
        toast.error(res.message || "Failed to update employee");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchDepartments();
    loadEmployee();
  }, [id]);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white rounded shadow-sm p-10">
        <h1 className="text-3xl font-bold mb-10">Edit Employee</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}
            <div>
              <label className={labelStyle}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.employeeId}
                onChange={handleChange}
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
                value={formData.dob}
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
                value={formData.gender}
                onChange={handleChange}
                className={selectStyle}
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
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className={selectStyle}
                required
              >
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
                value={formData.designation}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            {/* Department */}
            <div>
              <label className={labelStyle}>Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={selectStyle}
                required
              >
                <option value="">Select Department</option>

                {departmentsList?.map((dept) => (
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
                value={formData.salary}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className={labelStyle}>
                Password (Leave empty if unchanged)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* Role */}
            <div>
              <label className={labelStyle}>Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={selectStyle}
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">Employee</option>
              </select>
            </div>

            {/* Image */}
            <div>
              <label className={labelStyle}>
                Upload New Image (Optional)
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className={inputStyle}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md"
          >
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeEdit;