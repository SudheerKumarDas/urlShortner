import express from "express"

import urlRoutes from "./routes/urls.route.js"

const app = express();

app.use(express.json());

app.use("/urls",urlRoutes);

app.get("/",(req,res)=>{
    res.send("URL shortcode");
})

export default app;