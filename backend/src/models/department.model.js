import mongoose from "mongoose";
import Salary from './salary.models.js';
import Leave from './leaves.model.js';
import Employee from './employee.model.js';
import User from "./users.model.js";

const departmentSchema = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

departmentSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const employees = await Employee.find({
        department: this._id,
      });

      const empIds = employees.map((emp) => emp._id);
      const userIds = employees.map((emp) => emp.userId);

      await Employee.deleteMany({
        department: this._id,
      });

      await Leave.deleteMany({
        employeeId: { $in: empIds },
      });
      await Salary.deleteMany({
        employeeId: { $in: empIds },
      });
      const get = await User.deleteMany({
        _id: { $in: userIds },
      });

    } catch (error) {
      console.error(error);

      throw error;
    }
  }
);

const Department = mongoose.model("Department", departmentSchema);

export default Department;
