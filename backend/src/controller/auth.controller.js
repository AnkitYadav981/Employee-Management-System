import { generateEmployeeID } from "../config/generateEmployeeID.js";
import { generateToken } from "../config/utils.js";
import User from "../models/users.model.js";
import bcrypt from 'bcrypt';
import validator from 'validator';


export const login = async (req,res) =>{
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({message : "Allfeilds are Required"})
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message : "Invalid Credentails"})
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({message : "Invalid Credentails"})
        }
        const token = generateToken(user,res);
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            employeeId: user.employeeId,
            token: token,
        })
    } catch (error) {
        console.log("Error in login controller",error.message)
        return res.status(500).json({message:"Internal server Error"})
    }

}
export const logOut = async (req,res) =>{
    try {
    res.cookie("jwt_token","", {
      maxAge : 0
    });
    return res.status(200).json({message : "Logged out successfully"});
    
  } catch (error) {
    console.error("error in logout controller", error.message);
    return res.status(500).json({message : "Internal Server error"});
  }

}
export const createEmployee = async (req,res) =>{
    const {name, email, password, role, phoneNo} = req.body;
    try {
        if(!name || !email || !password || !phoneNo){
            return res.status(400).json({message : "Allfeilds are Required"})
        }
        const isUserExist = await User.findOne({email});
        if (isUserExist) {
            return res.status(400).json({message : "user Already exist"})
        }
        if(password?.length < 6){
            return res.status(400).json({message:"Password must be at least 6 character long"})
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({message:"Enter a valid email address"});
        }
        const employeeId = await generateEmployeeID();
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name : name,
            email : email,
            password : hashedPassword,
            role : "employee",
            phoneNo : phoneNo,
            employeeId : employeeId

        })
        
        if (user) {
            await user.save();
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                employeeId: user.employeeId,
                // profileImage : user.profileImage,
            })
        }
        else {
            return res.status(400).json({message:"User details not correct"})
        }

        
    } catch (error) {
        console.log("Error in signup controller",error.message)
        return res.status(500).json({message:"Internal server Error"})
    }

}
// export const createEmployee = async (req,res) =>{
//     try {
//         const {name, email, password, role, phoneNo} = req.body;

//         const userExist = await User.findOne({email});
//         if (userExist) {
//             return res.status(400).json({message : "user Already exist"})
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const employeeId = await generateEmployeeID();
//         const user = new User({
//             name : name,
//             email : email,
//             password : hashedPassword,
//             role : "employee",
//             phoneNo : phoneNo,
//             employeeId : employeeId
//         })
//         res.status(201).json({
//             message: "Employee created successfully",
//             user: {
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 employeeId: user.employeeId,
//             },
//         });
//     } catch (error) {
//         console.log("Error in signup controller",error.message);
//         return res.status(500).json({message:"Internal server Error"});
//     }
// }

export const getAllEmployees = async (req,res) => {
    try {
        const users = await User.find({role : "employee"}).select("-password");
        return res.status(200).json(users);
    } catch (error) {
        console.log("Error in fetching users controller",error.message);
        return res.status(500).json({message:"Internal server Error"});
    }
}

export const deleteEmployee = async (req,res) => {
    try {
        const {id} = req.params;
        await User.findByIdAndDelete(id);
        return res.status(200).json({success : true ,message:"Employee deleted successfully"})
    } catch (error) {
        console.log("Error in deleting employees controller",error.message);
        return res.status(500).json({message:"Internal server Error"});
    }
}
export const checkAuth = async (req,res) => {
    try {
        return res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checking auth controller",error.message);
        return res.status(500).json({message:"Internal server Error"});
    }
}