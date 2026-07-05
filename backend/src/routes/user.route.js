import express from "express"

import { createUser, getUserUrls, userLogin, userLogout } from "../controllers/user.controller.js"
import { authUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register",createUser);
router.post("/login",userLogin);
router.get("/me",authUser,getUserUrls);
router.get("/logout",authUser,userLogout);

export default router;