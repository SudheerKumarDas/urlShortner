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
        console.error("Error create creating short url",error);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}