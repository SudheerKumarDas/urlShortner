import express from "express"

import { createShortUrl, getAllUrls, getAUrl, deleteAUrl } from "../controllers/urls.controller.js";

const router = express.Router();

router.post("/",createShortUrl);
router.get("/",getAllUrls);
router.get("/:id",getAUrl);
router.delete("/:id",deleteAUrl);


export default router;