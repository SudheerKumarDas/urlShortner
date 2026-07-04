import Urls from "../models/Urls.model.js"

import { nanoid } from "nanoid";
import { createShortUrlService, getAllUrlsService, getAUrlService, deleteAUrlService } from "../services/urls.service.js";

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
        const urls = await getAllUrlsService();
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
        const url = await getAUrlService(id);
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
        const url = await deleteAUrlService(id);
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