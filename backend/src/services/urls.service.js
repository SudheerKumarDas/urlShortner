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