import express from "express"

import { createShortUrl, getAllUrls, getAUrl, deleteAUrl, updateUrl } from "../controllers/urls.controller.js";
import { validate } from "../middlewares/validate.js";
import { createUrlSchema } from "../validators/url.validator.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/",validate(createUrlSchema) , authUser ,createShortUrl);
router.get("/",authUser, getAllUrls);
router.get("/:id",authUser, getAUrl);
router.delete("/:id",authUser, deleteAUrl);
router.patch("/:id",authUser, updateUrl);


export default router;