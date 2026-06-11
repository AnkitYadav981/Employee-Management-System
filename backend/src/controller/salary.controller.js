import Salary from "../models/salary.models.js";
import Employee from "../models/employee.model.js";


export const addSalary = async(req,res) => {
    try{
        const {employeeId, basicSalary, allowances ,deductions, payDate} = req.body;
        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);
        const newSalary = new Salary({
            employeeId, 
            basicSalary, 
            allowances,
            deductions, 
            netSalary : totalSalary,
            payDate
        })
        await newSalary.save();
        return res.status(200).json({success : true})
    }
    catch (error) {
        console.log("Error while adding Salary",error);
        return res.status(500).json({success : false ,message : "Internal Server Error"});
    }
}
export const getSalary = async(req,res) => {
    try{
        const {id} = req.params;
        console.log("id in salary controller", id);
        let salary;
        salary  = await Salary.find({employeeId : id}).populate("employeeId","employeeId");
        console.log("salary in controller", salary);

        if(!salary || salary.length === 0) {
            console.log("No salary found for employeeId, trying userId", id);
            let employee;
            employee = await Employee.findOne({_id : id});
            if (!employee) {
                employee = await Employee.findOne({userId : id});
            }
            console.log("employee found with userId", employee);
            salary = await Salary.find({employeeId : employee._id}).populate("employeeId","employeeId");
        }

        return res.status(200).json({success : true, salary})
    }
    catch (error) {
        console.log("Error while getting Salary",error);
        return res.status(500).json({success : false ,message : "Internal Server Error"});
    }
}