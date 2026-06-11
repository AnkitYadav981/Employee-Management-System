import express from "express";
import { createEmployee, deleteEmployee, getAllEmployees } from "../controller/auth.controller.js";
import { adminOnly, protectRoute } from "../middleware/auth.middleware.js";

const routes = express.Router();

routes.post("/createEmployee",protectRoute,adminOnly,createEmployee);
routes.get("/employee",protectRoute,adminOnly,getAllEmployees);
routes.delete("/deleteEmployee/:id",protectRoute,adminOnly,deleteEmployee);
routes.get("/",protectRoute,adminOnly,(req, res) => {
  res.json({
    message: "admin access granted",
    user: req.user,
  });
});


export default routes;