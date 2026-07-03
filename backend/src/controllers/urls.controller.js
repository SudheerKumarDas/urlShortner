import Urls from "../models/Urls.model.js"

import { nanoid } from "nanoid";

export const createShortUrl = async (req,res) => {
    try {
        const { originalUrl } = req.body;
        const shortUrl = nanoid(7);
        const newUrl = new Urls({
            originalUrl,
            shortUrl:shortUrl,
            createdAt:new Date()
        })
        await newUrl.save();
        res.status(201).json({
            message:"Short URL is created successfully",
            Url:newUrl
        })
    } catch (error) {
        console.error("Error create creating short url",error);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}