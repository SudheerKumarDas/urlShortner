import Urls from "../models/Urls.model.js"

import { nanoid } from "nanoid";
import { createShortUrlService } from "../services/urls.service.js";

export const createShortUrl = async (req,res) => {
    try {
        const { originalUrl } = req.body;
        const newUrl = await createShortUrlService(originalUrl);
        console.log(newUrl);
        res.status(201).json({
            message:"Short URL is created successfully",
            Url:newUrl
        })
    } catch (error) {
        console.error("Error creating short url",error);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const getAllUrls = async(req,res)=>{
    try {
        const urls = await Urls.find({});
        if(!urls){
            return res.status(404).json({
                message:"URLs not found"
            })
        }
        res.status(200).json({
            message:"got all urls",
            urls:urls
        })
    } catch (error) {
        console.error("Error getting all urls",error);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}