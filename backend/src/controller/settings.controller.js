import User from "../models/users.model.js";
import bcrypt  from 'bcrypt';

export const changePassword = async (req, res) => {
    
    try {
        const { userId, oldPassword, newPassword } = req.body;
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Check if the old password is correct
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Old password is incorrect" });
        }
        const hashPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        const newUser = await User.findByIdAndUpdate(userId, { password: hashPassword }, { returnDocument: "after" });
        

        res.json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ success: false, error: "Server error" });
    }
}