import express from "express"

import urlRoutes from "./routes/urls.route.js"
import { redirectUrl } from "./controllers/urls.controller.js";

const app = express();

app.use(express.json());

app.use("/api/urls",urlRoutes);

app.get("/:shortUrl",redirectUrl);

app.get("/",(req,res)=>{
    res.send("URL shortcode");
})

export default app;