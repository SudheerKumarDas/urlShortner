import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

export const createUser = async (req,res) => {
    try {
        const {username,email,password} = req.body;
        if(!username || !email || !password) {
            return res.status(400).json({
                message:"Provide all the credentials"
            })
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
                message:"Email already registered"
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

export const userLogin = async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(409).json({
                message:"User do not exist"
            })
        }
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Please provide valid credentials"
            })
        }
        const token = jwt.sign({
            userId:user._id
        },process.env.JWT_SECRET,{
            expiresIn:"1h"
        })
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict",
            maxAge : 24 * 60 * 60 * 1000,
        })
        res.status(200).json({
            message:"User login successfully",
            user:{
                username:user.username,
                email:user.email
            }
        })
    } catch (error) {
        console.error("Error logging user",error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}