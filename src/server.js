import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import urlsRoutes from "./routes/urls.ROUTES.js"
import userRoutes from "./routes/user.ROUTES.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use(userRoutes)
app.use(urlsRoutes)

const port = process.env.PORT
app.listen(port, () => console.log(`Server running at ${port}`))