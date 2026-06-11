
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import User from "../models/users.model.js";
import bcrypt from "bcrypt"

dotenv.config({ path: "../../.env" }); // depending on folder


const adminRegister = async () => {
    try {
        console.log("MONGO_URI:", process.env.MONGO_URI);
        await connectDB();
        const password = "admin"
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name : "Admin",
            email : "admin@gmail.com",
            password : hashedPassword,
            role : "admin",
            phoneNo : "9999999999"
        })
        await newUser.save();
    } catch (error) {
        console.error("Error creating admin:", error);
    }
}

adminRegister();