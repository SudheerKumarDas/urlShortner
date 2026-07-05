import jwt, { decode } from "jsonwebtoken"
import User from "../models/user.model.js"

export const authUser = async (req,res,next) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const userId = decoded.userId;
    const user = await User.findById(userId);
    req.user = user
    next();
}