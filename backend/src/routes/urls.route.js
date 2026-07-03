import express from "express"

import { createShortUrl } from "../controllers/urls.controller.js";

const router = express.Router();

router.post("/",createShortUrl)

export default router;