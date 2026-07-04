import express from "express"

import { createShortUrl, getAllUrls, getAUrl, deleteAUrl, updateUrl } from "../controllers/urls.controller.js";

const router = express.Router();

router.post("/",createShortUrl);
router.get("/",getAllUrls);
router.get("/:id",getAUrl);
router.delete("/:id",deleteAUrl);
router.patch("/:id",updateUrl);


export default router;