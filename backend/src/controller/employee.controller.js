import User from "../models/users.model.js";
import Employee from '../models/employee.model.js';
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
export const upload = multer({ storage: storage });



export const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            profileImage : req.file? req.file.filename : "",
        });
        const savedUser = await newUser.save();
        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
        });
        await newEmployee.save();
        return res.status(201).json({success : true, message: "Employee added successfully" });



    } catch (error) {
        console.log("Error while adding a Employee",error);
        return res.status(500).json({success : false ,message : "Internal Server Error"});
    }
}
export const getAllEmployees = async (req,res) => {
    try {
        const employees = await Employee.find().populate("userId", "name email profileImage").populate("department", "departmentName");
        return res.status(200).json({success : true ,employees});
    } catch (error) {
        console.log("Error while fetching employees", error);
        return res.status(500).json({success : false ,message : "Internal Server Error"});
    }
}
export const getEmployee = async (req,res) => {
    try {
        const {id} = req.params;
        let employee;
        employee = await Employee.findById(id).populate("userId", "name email profileImage role").populate("department", "departmentName");
        if (!employee) {
            employee = await Employee.findOne({userId : id}).populate("userId", "name email profileImage role").populate("department", "departmentName");
        }
        return res.status(200).json({success : true ,employee});
    } catch (error) {
        console.log("Error while fetching employees", error);
        return res.status(500).json({success : false ,message : "Internal Server Error"});
    }
}

export const updateEmployee = async (req,res) => {
    try {
        const {id} = req.params;
        const {
            name,
            email,
            employeeId,
            dob,
            role,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
        } = req.body;
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }
        const updatedUser = await User.findByIdAndUpdate(employee.userId, {
            name,
            email,
            role,
            profileImage : req.file? req.file.filename : undefined,
        }, { returnDocument: "after" });

        const updatedEmployee = await Employee.findByIdAndUpdate(id, {
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
        }, { returnDocument: "after" });
        return res.status(200).json({success : true ,message : "Employee updated successfully", employee: updatedEmployee});
    } catch (error) {
        console.log("Error while updating employee", error);
        return res.status(500).json({success : false ,message : "Internal Server Error"});
    }
}

export const getEmployeeByDeprtmentId = async (req,res) => {
    try {
        const {id} = req.params;
        const employees = await Employee.find({department : id});
        return res.status(200).json({success : true ,employees});
    } catch (error) {
        console.log("Error geting Employee by department ID", error);
        return res.status(500).json({success : false ,message : "Internal Server Error"});
    }
}