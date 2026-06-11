import Department from "../models/department.model.js";

export const addDepartment = async (req, res) => {
  try {
    const { departmentName, description } = req.body;
    if (!departmentName) {
      return res.status(401).json({ message: "Department Name is Required" });
    }
    console.log("1");
    const newDep = new Department({
      departmentName,
      description,
    });
    console.log("2");
    console.log(newDep);
    await newDep.save();
    console.log("1234");
    return res.status(200).json({
      success: true,
      message: "Department created successfully",
      data: newDep,
    });
  } catch (error) {
    console.log("Error while adding a department", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json(departments);
  } catch (error) {
    console.log("Error while fetching departments");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedep = await Department.findById({ _id: id });
    await deletedep.deleteOne();

    return res.status(200).json({
      success: true,message: "Department deleted successfully",data: deletedep,
    });
  } catch (error) {
    console.log("Error while deleting a department",error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const editDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { departmentName, description } = req.body;
    console.log("Department Name:", req.body);
    // console.log("Description:", description);
    if (!departmentName) {
      return res.status(401).json({ message: "Department Name is Required" });
    }
    const updatedDep = await Department.findByIdAndUpdate(
      id,
      { departmentName, description },
      { returnDocument: "after" }
    );
    return res.status(200).json({
      success: true,
      message: "Department updated successfully",
      data: updatedDep,
    });
  } catch (error) {
    console.log("Error while deleting a department");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
