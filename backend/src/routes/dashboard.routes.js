import express from "express";
import { adminOnly, protectRoute } from "../middleware/auth.middleware.js";
import { getDashboardSummary, getEmployeeDashboardSummary } from "../controller/dashboard.controller.js";


const routes = express.Router();

routes.get("/summary",protectRoute,adminOnly, getDashboardSummary);
routes.get("/employee-dashboard-summary", protectRoute, getEmployeeDashboardSummary);


export default routes;