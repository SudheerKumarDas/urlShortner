import express from "express"

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("URL shortcode");
})

export default app;