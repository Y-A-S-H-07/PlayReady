import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import teamRoutes from "./routes/teamRoutes.js"
import eventRoutes from "./routes/eventRoutes.js"




dotenv.config()

const app = express()

app.use(cors({
  origin: "https://play-ready.vercel.app",
  credentials: true
}))
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/teams", teamRoutes)
app.use("/api/events", eventRoutes)



app.get("/", (req, res) => {
  res.send("PlayReady API Running")
})

const PORT = process.env.PORT || 5001

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected")
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
.catch((err) => console.log(err))