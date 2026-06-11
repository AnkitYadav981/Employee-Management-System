import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminDashboardOverview from './components/AdminDashboardOverview.jsx';
import { useAuthStore } from './store/useAuthStore.js';
import { useEffect } from 'react';
import EmployeeDashboard from './pages/EmployeeDashboard.jsx';
import DepartmentList from './components/department/DepartmentList.jsx';
import AddDepartment from './components/department/AddDepartment.jsx';
import EditDepartment from './components/department/EditDepartment.jsx';
import EmployeeList from './components/employee/EmployeeList.jsx';
import EmployeeAdd from './components/employee/EmployeeAdd.jsx';
import EmployeeView from './components/employee/EmployeeView.jsx';
import EmployeeEdit from './components/employee/EmployeeEdit.jsx';
import AddSalary from './components/salary/AddSalary.jsx';
import ViewSalary from './components/salary/ViewSalary.jsx';
import EmployeeSummary from './components/employeeDashboard/EmployeeSummary.jsx';
import EmployeeProfile from './components/employeeDashboard/EmployeeProfile.jsx';
import LeaveList from './components/leaves/LeaveList.jsx';
import AddLeave from './components/leaves/AddLeave.jsx';
import EmployeeSetting from './components/employeeDashboard/EmployeeSetting.jsx';
import AdminLeaves from './components/leaves/AdminLeaves.jsx';
import LeaveDetails from './components/leaves/LeaveDetails.jsx';



function App() {
  const {authUser,checkAuth} = useAuthStore();
  useEffect(() => {
    checkAuth();
  },[checkAuth])

  return (
    <>

    <Routes>
      <Route path='/' element = {<Navigate to="/login" />}></Route>
      <Route path='/login' element = {!authUser ? <Login /> : <Navigate to={authUser.role === "admin" ? "/admin-dashboard" : "/employee-dashboard"} />}></Route>
      <Route path='/employee-dashboard' element = {authUser && authUser.role === "user" ? <EmployeeDashboard /> : <Navigate to="/login" />}>
        <Route index element={<EmployeeSummary />} />
        <Route path="/employee-dashboard/profile/:id" element={<EmployeeProfile />} />
        
        <Route path="/employee-dashboard/leaves/:id" element={<LeaveList />} />
        <Route path="/employee-dashboard/leaves/add-new-leave" element={<AddLeave />} />

        <Route path="/employee-dashboard/salary/:id" element={<ViewSalary />} />
        <Route path="/employee-dashboard/settings" element={<EmployeeSetting />} />
      </Route>
      <Route path='/admin-dashboard' element = {authUser && authUser.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}>


        <Route index element={<AdminDashboardOverview />} />


        <Route path="/admin-dashboard/departments" element={<DepartmentList />} />
        <Route path="/admin-dashboard/add-new-department" element={<AddDepartment />} />
        <Route path="/admin-dashboard/departments/edit/:id" element={<EditDepartment />} />


        <Route path="/admin-dashboard/employees" element={<EmployeeList />} />
        <Route path="/admin-dashboard/employee/view/:id" element={<EmployeeView />} />
        <Route path="/admin-dashboard/add-new-employee" element={<EmployeeAdd />} />
        <Route path="/admin-dashboard/employee/edit/:id" element={<EmployeeEdit />} />


        <Route path="/admin-dashboard/leaves" element={<AdminLeaves />} />
        <Route path="/admin-dashboard/employee/leaves/:id" element={<LeaveList />} />
        <Route path="/admin-dashboard/leaves/details/:id" element={<LeaveDetails />} />

        <Route path="/admin-dashboard/salary/add" element={<AddSalary />} />
        <Route path="/admin-dashboard/employee/salary/:id" element={<ViewSalary />} />


        <Route path="/admin-dashboard/settings" element={<EmployeeSetting />} />
        <Route index element={<AdminDashboardOverview />} />
      </Route>
      <Route path='/logout' element={<Navigate to="/login" />}></Route>
    </Routes>
    <Toaster />
    </>
  )
}

export default App
