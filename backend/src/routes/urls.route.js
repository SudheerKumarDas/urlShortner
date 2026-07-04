import express from "express"

import { createShortUrl, getAllUrls } from "../controllers/urls.controller.js";

const router = express.Router();

router.post("/",createShortUrl);
router.get("/",getAllUrls);


export default router;