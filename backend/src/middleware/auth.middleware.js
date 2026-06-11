import jwt  from 'jsonwebtoken';
import User from '../models/users.model.js';


export const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwt_token;
        // console.log("Cookies:", token);
        if (!token) {
            return res.status(401).json({message : "Unauthorized no token found"})
        }
        const decodedToken = jwt.verify(token,process.env.JWT_KEY);
        if (!decodedToken) {
            return res.status(401).json({message : "Unauthorized token not valid"})
        }
        const user = await User.findById(decodedToken.user._id).select("-password")

        if (!user) {
            return res.status(401).json({message : "Unauthorized user not found"})
        }
        req.user = user;
        next();

        
    } catch (error) {
        console.error("error in protect route middleware", error.message);
        return res.status(500).json({message : "Internal Server error"});
    }
}

export const adminOnly = async (req,res,next) => {
    if (req.user && req.user.role == "admin") {
        next();
    }
    else {
        return res.status(403).json({ message: "Admin access only" });
    }
}