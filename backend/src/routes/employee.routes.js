import express from 'express';
import { protectRoute, adminOnly } from '../middleware/auth.middleware.js';
import { addEmployee, getAllEmployees, getEmployee, getEmployeeByDeprtmentId, updateEmployee, upload } from '../controller/employee.controller.js';

const routes = express.Router();


routes.post("/add", protectRoute,adminOnly, upload.single("image"), addEmployee)
routes.get("/getAll", protectRoute,adminOnly, getAllEmployees);
routes.get("/view/:id", protectRoute, getEmployee);
routes.get("/department/:id", protectRoute, getEmployeeByDeprtmentId);
routes.patch("/edit/:id", protectRoute,adminOnly, upload.single("image"), updateEmployee);


export default routes;