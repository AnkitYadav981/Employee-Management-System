import  express  from 'express';
import { adminOnly, protectRoute } from '../middleware/auth.middleware.js';
import { addDepartment, deleteDepartment, editDepartment, getAllDepartments } from '../controller/department.controller.js';


const routes = express.Router();

routes.get("/",protectRoute,adminOnly, getAllDepartments)
routes.post("/add", protectRoute,adminOnly, addDepartment)
routes.delete("/delete/:id", protectRoute,adminOnly, deleteDepartment)
routes.patch("/edit/:id", protectRoute,adminOnly, editDepartment)

export default routes;
