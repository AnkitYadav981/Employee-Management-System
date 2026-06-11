import User from "../models/users.model.js";

export const generateEmployeeID = async () => {
    try {
        const count = await User.countDocuments();
        const employeeId = `EMP${1000 + count + 1}`;
        return employeeId;
    } catch (error) {
        console.log("error in generating Employee ID",error.message);
        return res.status(500).json({message:"Internal server Error"});
    }
}
