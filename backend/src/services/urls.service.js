import { nanoid } from "nanoid";

import Urls from "../models/Urls.model.js";

export const createShortUrlService = async (originalUrl) => {
            const shortUrl = nanoid(7);
            const newUrl = new Urls({
                originalUrl:originalUrl,
                shortUrl:shortUrl,
                createdAt:new Date()
            })
            await newUrl.save();
            return newUrl;
    }

export const getAllUrlsService = async () => {
    const urls = await Urls.find({});
    return urls;
}


export const getAUrlService = async (id) => {
    const url = await Urls.findById(id);
    return url;
}

export const deleteAUrlService = async (id) => {
    const deletedUrl = await Urls.findByIdAndDelete(id);
    return deletedUrl;
}


export const updatedUrlService = async (id,originalUrl) => {
    const updatedUrl = await Urls.findByIdAndUpdate(id,{
            originalUrl:originalUrl
        },{
            new:true
        })
    return updatedUrl;
}