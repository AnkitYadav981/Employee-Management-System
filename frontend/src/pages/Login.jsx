import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from '../store/useAuthStore.js';
import { useNavigate } from "react-router-dom";


const Login = () => {
    // const [email,setEmail] = useState();
    // const [password,setPassword] = useState();
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const [formData,setFormData] = useState({
        email : "",
        password : ""
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData).then((res) => {
            console.log("Login successful:", res);
            if (res.data.role == "admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/employee-dashboard");
            }
        });

        console.log("hello")

    } 

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-linear-to-b from-teal-600 from-50% to-gray-100 to-50%">
        
        {/* Title */}
        <h1 className="text-white text-3xl font-dancing mb-10">
            Employee Management System
        </h1>

        {/* Login Card */}
        
        <form className="bg-white shadow-lg rounded-md w-full max-w-md p-8" onSubmit={handleSubmit}>
            
            <h2 className="text-2xl font-semibold mb-6">Login</h2>

            {/* Email */}
            <div className="mb-4">
            <label className="block text-gray-600 mb-1">Email</label>
            <input
                type="text"
                placeholder="Enter Username"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                onChange={(e) => setFormData({ ...formData, email : e.target.value})}
                required
            />
            </div>

            {/* Password */}
            <div className="mb-4">
            <label className="block text-gray-600 mb-1">Password</label>
            <input
                type="password"
                placeholder="Enter Password"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                onChange={(e) => setFormData({...formData, password : e.target.value})}
                required
            />
            </div>

            {/* Options */}
            <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2" />
                Remember me
            </label>

            <a href="#" className="text-sm text-teal-600 hover:underline">
                Forgot password?
            </a>
            </div>

            {/* Button */}
            <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition">
            Login
            </button>

        </form>
        </div>
    );
};

export default Login;