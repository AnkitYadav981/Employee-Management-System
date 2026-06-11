import  express  from 'express';
import { adminOnly, protectRoute } from '../middleware/auth.middleware.js';
import { addSalary, getSalary } from '../controller/salary.controller.js';

const routes = express.Router();

routes.post("/add", protectRoute,adminOnly, addSalary)
routes.get("/:id", protectRoute, getSalary)

export default routes;
