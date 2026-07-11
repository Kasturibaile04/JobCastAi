const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(cors({
    origin: "https://job-cast-ai-frontend.vercel.app",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

// require all the routes here
const authRouter = require("./routes/auth.routes")
const interviewrouter = require("./routes/interview.routes")

// using all the routes here
app.use("/api/auth", authRouter)
app.use("/api/interview",interviewrouter)


module.exports = app
