import Urls from "../models/Urls.model.js"

export const createShortUrl = async (req,res) => {
    try {
        const { originalUrl} = req.body;
        
    } catch (error) {
        console.error("Error create creating short url",error);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}