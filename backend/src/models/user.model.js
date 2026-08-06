import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verificationToken:{
        type:String
    },
    verificationTokenExpires:{
        type:Date
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordTokenExpires:{
        type:Date
    }
},{
    timestamps:true
})

const User = mongoose.model("User",userSchema);

export default User;