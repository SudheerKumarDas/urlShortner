import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../models/user.model.js";
import Urls from "../models/Urls.model.js";
import emailVerification from "../services/email.service.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Provide all the credentials",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const rawVerificationToken = crypto.randomBytes(32).toString('hex');
    const hashedVerificationToken = crypto.createHash('sha256').update(rawVerificationToken).digest('hex');
    
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      verificationToken:hashedVerificationToken,
      verificationTokenExpires:Date.now()+60*60*1000
    });
    
    await emailVerification(newUser.email,rawVerificationToken);
    res.status(201).json({
      message: "user created successfully, check your email for verification",
      user: {
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const verifyEmail = async (req,res) => {
  try {
    const {token} = req.query;
    if(!token){
      return res.status(400).json({
        message:"token not provided"
      })
    }
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      verificationToken:hashedToken,
      verificationTokenExpires:{$gt:Date.now()}
    })
    if(!user){
      return res.status(404).json({
        message:"Invalid or expired verification token"
      })
    }
    user.isVerified=true;
    user.verificationToken=undefined;
    user.verificationTokenExpires=undefined;

    await user.save();

    res.status(200).json({
      message:"email verified successfully"
    })

  } catch (error) {
    console.error("Error verifying email", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export const resendVerifyEmail = async (req,res) => {
  try {
    const { email } = req.body;
    if(!email){
      return res.status(400).json({
        message:"Provide email"
      })
    }
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({
        message:"User not found"
      })
    }
    if(user.isVerified){
      return res.status(400).json({
        message:"User already verified"
      })
    }
    const rawVerificationToken = crypto.randomBytes(32).toString('hex');
    const hashedVerificationToken = crypto.createHash('sha256').update(rawVerificationToken).digest('hex');
    
    user.verificationToken = hashedVerificationToken;
    user.verificationTokenExpires = Date.now() + 60 * 60 *1000;

    await user.save();
    await emailVerification(email,rawVerificationToken);

    res.status(200).json({
      message:"check your email for verification"
    })
  } catch (error) {
    console.error("Error verifying email", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({
        message: "User do not exist",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Please provide valid credentials",
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    const isProduction = process.env.NODE_ENV==="production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction?"none":"lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "User login successfully",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging user", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getUserUrls = async (req, res) => {
  try {
    const user = req.user;
    // const urls = await Urls.find({ owner: user._id });
    // res.status(200).json({
    //   message: "fetched all the urls created by this user",
    //   urls: urls,
    // });
    res.status(200).json({
      message:"User fetched successfully",
      user:{
        id:user._id,
        username:user.username,
        email:user.email
      },
    })
  } catch (error) {
    console.error("Error fetching user's urls", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const userLogout = async (req,res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            message:"Logged out successfully"
        })
    } catch (error) {
        console.error("Error fetching user's urls", error);
    res.status(500).json({
      message: "Internal server error",
    });
    }
}