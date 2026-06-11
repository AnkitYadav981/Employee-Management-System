import Employee from "../models/employee.model.js";
import Department from "../models/department.model.js";
import Leave from "../models/leaves.model.js";
import Salary from "../models/salary.models.js";

export const getDashboardSummary = async (req, res) => {
  try {
    // Fetch total employees count
    const totalEmployees = await Employee.countDocuments();

    // Fetch total departments count
    const totalDepartments = await Department.countDocuments();

    // Calculate monthly pay
    const totalSalaries = await Employee.aggregate([
      {
        $group: {
          _id: null,
          totalSalary: { $sum: "$salary" },
        },
      },
    ]);

    const employeeAppliedForLeave = await Leave.distinct("employeeId");
    const totalAppliedLeave = await Leave.countDocuments();

    const leaveStatus = await Leave.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const leaveSummary = {
      // appliedFor: employeeAppliedForLeave.length,
      appliedFor: totalAppliedLeave,
      approved: leaveStatus.find((item) => item._id === "Approved")?.count || 0,

      rejected: leaveStatus.find((item) => item._id === "Rejected")?.count || 0,

      pending: leaveStatus.find((item) => item._id === "Pending")?.count || 0,
    };

    return res.status(200).json({
      success: true,
      totalEmployees,
      totalDepartments,
      totalSalary: totalSalaries[0]?.totalSalary || 0,
      leaveSummary,
    });
  } catch (error) {
    console.log("Error in getDashboardSummary controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getEmployeeDashboardSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const employee = await Employee.findOne({ userId }).populate("department");

    const leaves = await Leave.find({
      employeeId: employee._id,
    });

    const salary = await Salary.findOne({
      employeeId: employee._id,
    }).sort({ payDate: -1 });

    const dataSummary = {
      summary: {
        totalLeaves: leaves.length,
        approvedLeaves: leaves.filter((leave) => leave.status === "Approved")
          .length,

        pendingLeaves: leaves.filter((leave) => leave.status === "Pending")
          .length,
        rejectedLeaves: leaves.filter((leave) => leave.status === "Rejected")
          .length,
      },

      employeeInfo: {
        employeeId: employee.employeeId,
        department: employee.department.departmentName,
        designation: employee.designation,
        joiningDate: employee.createdAt.toLocaleDateString("en-GB"),
      },

      salary: salary ? { ...salary._doc, payDate: salary.payDate.toLocaleDateString("en-GB") } : null,
      recentActivities: [
        {
          id: 1,
          title: "Casual Leave Approved",
          date: "05-Jun-2026",
          color: "green",
        },
        {
          id: 2,
          title: "Sick Leave Pending",
          date: "12-Jun-2026",
          color: "yellow",
        },
        {
          id: 3,
          title: "Salary Credited - ₹50,000",
          date: "31-May-2026",
          color: "blue",
        },
      ],
    };

    return res.status(200).json({
      success: true,
      dataSummary,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
