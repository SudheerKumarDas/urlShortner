import express from "express"

import { createUser, getUserUrls, userLogin, userLogout } from "../controllers/user.controller.js"
import { authUser } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";
import { loginUserSchema, registerUserSchema } from "../validators/user.validator.js";

const router = express.Router();

router.post("/register",validate(registerUserSchema),createUser);
router.post("/login",validate(loginUserSchema),userLogin);
router.get("/me",authUser,getUserUrls);
router.post("/logout",authUser,userLogout);

export default router;