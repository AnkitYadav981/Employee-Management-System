import  express  from 'express';
import { adminOnly, protectRoute } from '../middleware/auth.middleware.js';
import { addLeave, changeLeaveStatus, getAllLeave, getLeave, getLeaveDetails } from '../controller/leaves.controller.js';

const routes = express.Router();

routes.post("/add", protectRoute, addLeave)
routes.get("/allLeaves", protectRoute, adminOnly, getAllLeave)
routes.patch("/changeStatus/:id", protectRoute, adminOnly, changeLeaveStatus)
routes.get("/details/:id", protectRoute, adminOnly, getLeaveDetails)
routes.get("/:id", protectRoute, getLeave)

export default routes;
