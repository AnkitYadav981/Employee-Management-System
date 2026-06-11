import jwt from "jsonwebtoken";

export const generateToken = (user, res) => {
    const token = jwt.sign({user},process.env.JWT_KEY,{
        expiresIn : "1d"
    })
    res.cookie("jwt_token",token, {
        maxAge : 24*60*60*1000,
    })
    return token;
}