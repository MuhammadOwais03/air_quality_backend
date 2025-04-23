import express from "express"
import cors from "cors"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
app.use(express.static("public"))


//Routes
import router from "./routes/temp.route.js"
import Uploadrouter from "./routes/upload.routes.js"

app.use("/api/temp", router)
app.use("/api/upload", Uploadrouter)

export { app }