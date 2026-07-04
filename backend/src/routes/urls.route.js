import express from "express"

import { createShortUrl, getAllUrls, getAUrl } from "../controllers/urls.controller.js";

const router = express.Router();

router.post("/",createShortUrl);
router.get("/",getAllUrls);
router.get("/:id",getAUrl);


export default router;