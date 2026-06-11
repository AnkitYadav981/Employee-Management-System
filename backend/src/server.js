import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import adminRoutes from "./routes/admin.auth.routes.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import salaryRoutes from "./routes/salary.routes.js";
import leaveRoutes from "./routes/leaves.route.js";
import settingRoutes from "./routes/settings.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import path from "path";


dotenv.config();
const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
}))
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/emp/admin", adminRoutes)
app.use("/emp/department", departmentRoutes)
app.use("/emp", authRoutes)
app.use("/emp/employee", employeeRoutes)
app.use("/emp/salary", salaryRoutes)
app.use("/emp/leaves", leaveRoutes)
app.use("/emp/setting", settingRoutes)
app.use("/emp/dashboard", dashboardRoutes)

if(process.env.NODE_ENV == "production"){
  app.use(express.static(path.join(__dirname , "../../frontend/dist")))

  app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "../../frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
    connectDB();
});
