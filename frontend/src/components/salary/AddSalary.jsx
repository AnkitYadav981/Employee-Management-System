import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const inputStyle =
  "w-full border rounded-md p-3 outline-none focus:border-teal-500";

const labelStyle = "block mb-2 font-medium";

const selectStyle =
  "w-full h-[50px] px-3 border rounded-md bg-white outline-none focus:border-teal-500";

const AddSalary = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [employees, setEmployees] = useState(null);
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary : 0,
    allowances : 0,
    deductions : 0,
    payDate : null
  });
  console.log("Employees",employees)
  console.log("Salary",salary)

  const { getEmployeeForSalary,departmentsList, fetchDepartments,addSalary } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;

      setSalary((prev) => ({
        ...prev,
        [name]: value,
      }));
    
  };
  const handleDepartment = async (e) =>{
    const emps = await getEmployeeForSalary(e.target.value);
    console.log(emps);
    setEmployees(emps);
  }

  // const loadEmployee = async () => {
  //   try {
  //     const res = await fetchEmployee(id);
  //     const employee = res.data.employees
  //     console.log("hello",employee)

  //     if (employee) {
  //       setFormData({
  //         name: employee.userId.name || "",
  //         email: employee.userId.email || "",
  //         employeeId: employee.employeeId || "",
  //         dob: employee.dob
  //           ? new Date(employee.dob).toISOString().split("T")[0]
  //           : "",
  //         gender: employee.gender || "",
  //         maritalStatus: employee.maritalStatus || "",
  //         designation: employee.designation || "",
  //         department: employee.department?._id || employee.department || "",
  //         salary: employee.salary || "",
  //         password: "",
  //         role: employee.userId.role || "",
  //         image: null,
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.success("Failed to fetch employee details");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await addSalary(salary);
      console.log(res);

      if (res.data.success) {
        toast.success("Salary Added successfully");
        navigate("/admin-dashboard/employees");
      } else {
        toast.error(res.message || "Failed to add Salary");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [id]);

  return (
    <>{departmentsList  ? (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white rounded shadow-sm p-10">
        <h1 className="text-3xl font-bold mb-10">Add Salary</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Department */}
            <div>
              <label className={labelStyle}>Department</label>
              <select
                name="department"
                value={employees?._id}
                onChange={handleDepartment}
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
            {/* Employee */}
            <div>
              <label className={labelStyle}>Employee</label>
              <select
                name="employeeId"
                onChange={handleChange}
                className={selectStyle}
                required
              >
                <option value="">Select Employee</option>

                {employees?.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.employeeId}
                  </option>
                ))}
              </select>
            </div>

            {/* Basic Salary */}
            <div>
              <label className={labelStyle}>Basic Salary</label>
              <input
                type="number"
                name="basicSalary"
                placeholder="Basic Salary"
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            {/* Allowance */}
            <div>
              <label className={labelStyle}>Allowance</label>
              <input
                type="number"
                name="allowances"
                placeholder="Allowances"
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            

            

            {/* Deductions */}
            <div>
              <label className={labelStyle}>Deductions</label>
              <input
                type="number"
                name="deductions"
                placeholder="Deductions"
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            {/* Pay Date */}
            <div>
              <label className={labelStyle}>Pay Date</label>
              <input
                type="date"
                name="payDate"
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md"
          >
            Add Salary
          </button>
        </form>
      </div>
    </div>
      ) : <div>hello</div>}
      </>
  );
  
};

export default AddSalary;