import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component/dist/index.es.js";
import { useAuthStore } from "../../store/useAuthStore.js";
import EditDepartment from "./EditDepartment.jsx";



const DepartmentList = () => {
  const { fetchDepartments, departmentsList } = useAuthStore();
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchText, setSearchText] = useState("");

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setSelectedDepartment(null);
  };

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  useEffect(() => {
    setFilteredDepartments(departmentsList);
  }, [departmentsList]);

  const handleDelete = async (departmentId) => {
    await useAuthStore.getState().deleteDepartment(departmentId);
    await fetchDepartments();
    console.log("Delete department with id:", departmentId);
  };

  const filterDepartments = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const record = departmentsList.filter((department) =>
      department.departmentName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDepartments(record);
  };

  const columns = [
    {
      name: "S No",
      cell: (row, rowIndex) => <span>{rowIndex + 1}</span>,
      width: "80px",
      // grow: 1,
      sortable: false,
    },
    {
      name: "Department",
      selector: (row) => row.departmentName,
      sortable: true,
      grow: 1,
      // width: "500px",
    },
    {
      name: "Action",
      grow: 1,
      cell: (row) => (
        <div className="flex gap-1 py-2">
          <button
            onClick={() => handleEdit(row)}
            className="flex items-center gap-1 bg-green-400 hover:bg-green-500 text-white px-4 py-1 rounded"
          >
            <Pencil size={16} />
            Edit
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="flex items-center gap-1 bg-red-400 hover:bg-red-500 text-white px-4 py-1 rounded"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      ),
      // width: "200px",
    },
  ];

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
      {/* Heading */}
      <h1 className="text-2xl font-bold text-center mb-8">
        Manage Departments
      </h1>

      {/* Search + Button */}
      <div className="flex items-center justify-between mb-5">
        <input
          type="text"
          placeholder="Search By Department"
          value={searchText}
          onChange={filterDepartments}
          className="w-72 px-4 py-1 border border-gray-800 rounded outline-none bg-white"
        />

        <Link
          to="/admin-dashboard/add-new-department"
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-1 rounded font-semibold"
        >
          Add New Department
        </Link>
      </div>

      {/* DataTable */}
      <div className="bg-white rounded shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredDepartments}
          customStyles={customTableStyles}
          pagination
          paginationPerPage={10}
          responsive
          highlightOnHover
          striped
        />
      </div>

      {/* Edit Modal */}
      {showEdit && selectedDepartment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseEdit}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <EditDepartment
              departmentData={selectedDepartment}
              onClose={handleCloseEdit}
              refreshDepartments={fetchDepartments}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentList;