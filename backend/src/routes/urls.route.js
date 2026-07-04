import express from "express"

import { createShortUrl, getAllUrls, getAUrl, deleteAUrl, updateUrl } from "../controllers/urls.controller.js";
import { validate } from "../middlewares/validate.js";
import { createUrlSchema } from "../validators/url.validator.js";

const router = express.Router();

router.post("/",validate(createUrlSchema) ,createShortUrl);
router.get("/",getAllUrls);
router.get("/:id",getAUrl);
router.delete("/:id",deleteAUrl);
router.patch("/:id",updateUrl);


export default router;