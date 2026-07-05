import Urls from "../models/Urls.model.js"

import { nanoid } from "nanoid";
import { createShortUrlService, getAllUrlsService, getAUrlService, deleteAUrlService, updatedUrlService } from "../services/urls.service.js";

export const createShortUrl = async (req,res) => {
    try {
        const { originalUrl } = req.body;
        const user = req.user;
        console.log(user);
        const userId = user._id;
        const newUrl = await createShortUrlService(originalUrl,userId);
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
        const user = req.user;
        const userId = user._id;
        const urls = await getAllUrlsService(userId);
        if(!urls || urls.length===0 ){
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

export const getAUrl = async (req,res) => {
    try {
        const {id} = req.params;
        const user = req.user;
        const userId = user._id;
        const url = await getAUrlService(id,userId);
        if(!url){
            return res.status(404).json({
                message:"URL not found"
            })
        }
        res.status(200).json({
            message:"Got a url",
            url:url
        })
    } catch (error) {
        console.error("Error getting a url",error);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const deleteAUrl = async(req,res)=> {
    try {
        const { id } = req.params;
        const user = req.user;
        const userId = user._id;
        const url = await deleteAUrlService(id,userId);
        console.log(url);
        if(!url){
            return res.status(404).json({
                message:"Url not found"
            })
        }
        res.status(200).json({
            message:"Url deleted successfully",
            deletedUrl:url
        })
    } catch (error) {
        console.error("Error deleting url",error);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const updateUrl = async (req,res) => {
    try {
        const { id } = req.params;
        const { originalUrl } = req.body;
        const user = req.user;
        const userId = user._id;
        const updatedUrl = await updatedUrlService(id,originalUrl,userId);
        res.status(200).json({
            message:"url updated successfully",
            updatedUrl:updatedUrl
        })
    } catch (error) {
        console.error("Error updating url",error);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const redirectUrl = async (req,res) => {
    try {
        const { shortUrl } = req.params;
        const url = await Urls.findOneAndUpdate({shortUrl:shortUrl},{$inc:{clicks:1}},{new:true});
        console.log(url);
        if(!url){
            return res.status(404).json({
                message:"URL not found"
            })
        }
        res.redirect(url.originalUrl);
    } catch (error) {
        console.error("Error redirecting url",error);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }   
}