import express from "express";
import {checkAuth, login, logOut } from "../controller/auth.controller.js";
import { adminOnly, protectRoute } from "../middleware/auth.middleware.js";


const routes = express.Router();

routes.get("/", (req, res) => {
    res.send("Hello World!");
})
routes.post("/login",login);
routes.post("/logout",logOut);
routes.get("/check",protectRoute, checkAuth);


export default routes;