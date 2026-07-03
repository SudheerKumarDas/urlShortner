import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    originalUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true,
        unique:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId
    },
    clicks:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        required:true
    }
})

const Urls = new mongoose.model("Urls",urlSchema);

export default Urls;