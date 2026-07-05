import express from "express"
import cookieParser from "cookie-parser";

import urlRoutes from "./routes/urls.route.js"
import userRoutes from "./routes/user.route.js"
import { redirectUrl } from "./controllers/urls.controller.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/urls",urlRoutes);
app.use("/api/auth",userRoutes);

app.get("/:shortUrl",redirectUrl);

app.get("/",(req,res)=>{
    res.send("URL shortcode");
})

export default app;