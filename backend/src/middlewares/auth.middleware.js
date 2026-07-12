import jwt, { decode } from "jsonwebtoken";
import User from "../models/user.model.js";

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const user = await User.findById(userId).select("-password");
    req.user = user;
    next();
  } catch (error) {
    console.error("NO token provided", error);
  }
};
