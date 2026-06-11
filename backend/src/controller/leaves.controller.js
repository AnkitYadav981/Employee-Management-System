import Leave from "../models/leaves.model.js";
import Employee from '../models/employee.model.js';

export const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    const employee = await Employee.findOne({ userId });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const newLeave = new Leave({
      employeeId: employee._id, // ✅ Employee document ID
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error while adding Leave", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const getLeave = async (req, res) => {
  try {
    const { id } = req.params;
    let leaves = await Leave.find({ employeeId: id }).sort({ createdAt: -1 });
    console.log("leaves", leaves);
    if (!leaves || leaves.length === 0) {
        const employee = await Employee.findOne({ userId: id });
        console.log("employee", employee);
        leaves = await Leave.find({ employeeId: employee._id }).sort({ createdAt: -1 });
        
    }
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.log("Error while fetching Leave", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const getLeaveDetails = async (req, res) => {
  try {
    const {id} = req.params ;
    const leaves = await Leave.findById(id)
      .populate({
        path: "employeeId",
        populate: [
          {
            path: "department",
            select: "departmentName",
          },
          {
            path: "userId",
            select: "name profileImage",
          },
        ],
      })
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.log("Error while fetching All Leaves", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const getAllLeave = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate({
        path: "employeeId",
        populate: [
          {
            path: "department",
            select: "departmentName",
          },
          {
            path: "userId",
            select: "name",
          },
        ],
      })
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.log("Error while fetching All Leaves", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const changeLeaveStatus = async (req, res) => {
    try {
        const {id} = req.params;
        console.log("1");
        const leaves = await Leave.findByIdAndUpdate(id, {status: req.body.status}, { returnDocument: "after" });
        console.log("2");
        console.log("leaves", leaves);
        return res.status(200).json({ success: true, leaves });
    }
    catch (error) {
    console.log("Error while Changing Leaves Status", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

