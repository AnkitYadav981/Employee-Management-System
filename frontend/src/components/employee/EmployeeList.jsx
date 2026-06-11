import React, { useState } from "react";
import DataTable from "react-data-table-component/dist/index.es.js";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore.js";
import { useEffect } from "react";
import { EmployeeButton } from "./EmployeeHelper.jsx";
import { IMAGE_BASE_URL } from "../../img_URL/img_Url.js";

const EmployeeList = () => {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { fetchAllEmployees, employeesList } = useAuthStore();


  const employees = employeesList.employees; // Replace with actual employee data from your store or API

  useEffect(() => {
    fetchAllEmployees();
  }, [fetchAllEmployees]);
  // const IMAGE_BASE_URL = "http://localhost:3000/uploads/";
  
  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);
  const filterEmployees = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const record = employees.filter((employee) =>
      employee.employeeId.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEmployees(record);
  }

  const columns = [
    {
      name: "S No",
      selector: (row, index) => index + 1,
      width: "90px",
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={row.userId?.profileImage ? `${IMAGE_BASE_URL}/${row.userId.profileImage}` : `${IMAGE_BASE_URL}/default.jpeg`}
          alt={row.userId?.name}
          className="w-10 h-10 rounded-full object-cover"
        />

      ),
    },
    {
      name: "Employee ID",
      selector: (row) => row.employeeId,
      sortable: true,
    },
    {
      name: "DOB",
      selector: (row) => new Date(row.dob).toLocaleDateString("en-IN"),
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row.department?.departmentName,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <EmployeeButton Id={row._id} />
      ),
      grow: 2,
    },
  ];
  console.log("2");
    const customTableStyles = {
    rows: {
      style: {
        backgroundColor: "white",
        borderBottomWidth: "1px",
        borderBottomColor: "#e5e7eb",
        "&:hover": {
          backgroundColor: "#f9fafb",
        },
      },
    },
    headCells: {
      style: {
        backgroundColor: "white",
        fontWeight: "bold",
        fontSize: "16px",
        borderBottomWidth: "1px",
        borderBottomColor: "#e5e7eb",
        paddingLeft: "20px",
        paddingRight: "20px",
      },
    },
    cells: {
      style: {
        paddingLeft: "20px",
        paddingRight: "20px",
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold text-center mb-8">
            Manage Employees
        </h1>

        {/* Search + Button */}
        <div className="flex items-center justify-between mb-5">
            <input
            type="text"
            placeholder="Search By Employee ID"
            value={searchText}
            onChange={filterEmployees}
            className="w-72 px-4 py-1 border border-gray-800 rounded outline-none bg-white"
            />

            <Link
            to="/admin-dashboard/add-new-employee"
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-1 rounded font-semibold"
            >
            Add New Employee
            </Link>
        </div>

      <DataTable
        columns={columns}
        data={filteredEmployees}
        customStyles={customTableStyles}
        pagination
        highlightOnHover
        striped
        responsive
      />
    </div>
  );
};

export default EmployeeList;