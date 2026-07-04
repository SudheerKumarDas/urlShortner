import bcrypt from "bcrypt"

import User from "../models/user.model.js";

export const createUser = async (req,res) => {
    try {
        const {username,email,password} = req.body;
        if(!username || !email || !password) {
            return res.status(400).json({
                message:"Provide all the credentials"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            username,
            email,
            password:hashedPassword
        })
        res.status(201).json({
            message:"user created successfully",
            user:{
                username:user.username,
                email:user.email
            }
        })
    } catch (error) {
        console.error("Error creating user",error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}