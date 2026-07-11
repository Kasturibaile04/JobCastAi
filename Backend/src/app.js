const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// 1. CORS Configuration (First priority)
app.use(cors({
    origin: "https://job-cast-ai-frontend.vercel.app",
    credentials: true
}));

// 2. Body and Cookie Parsers (MUST run before routes)
app.use(express.json());
app.use(cookieParser());

// 3. Route Handlers
const authRouter = require("./routes/auth.routes");
const interviewrouter = require("./routes/interview.routes");

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewrouter);

module.exports = app;