import { nanoid } from "nanoid";

import Urls from "../models/Urls.model.js";

export const createShortUrlService = async (originalUrl,userId) => {
            const shortUrl = nanoid(7);
            const newUrl = new Urls({
                originalUrl:originalUrl,
                shortUrl:shortUrl,
                owner:userId,
                createdAt:new Date()
            })
            await newUrl.save();
            return newUrl;
    }

export const getAllUrlsService = async (userId) => {
    const urls = await Urls.find({owner:userId});
    return urls;
}


export const getAUrlService = async (id,userId) => {
    const url = await Urls.findOne({
        _id:id,
        owner:userId
    });
    return url;
}

export const deleteAUrlService = async (id,userId) => {
    const deletedUrl = await Urls.findOneAndDelete({
        _id:id,
        owner:userId
    });
    return deletedUrl;
}


export const updatedUrlService = async (id,originalUrl,userId) => {
    const updatedUrl = await Urls.findOneAndUpdate({
        _id:id,
        owner:userId
    },{
            originalUrl:originalUrl
        },{
            new:true
        })
    return updatedUrl;
}