import express from "express"

import { createUser, getUserUrls, userLogin } from "../controllers/user.controller.js"
import { authUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register",createUser);
router.post("/login",userLogin);
router.get("/me",authUser,getUserUrls);

export default router;