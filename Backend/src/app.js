const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// 1. CORS Configuration — allow both production AND local development
const allowedOrigins = [
    "https://job-cast-ai-frontend.vercel.app",
    "http://localhost:5173",      // Vite default
    "http://localhost:3000",      // Common local port
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, Postman)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

// 2. Body and Cookie Parsers
app.use(express.json());
app.use(cookieParser());

// 3. Route Handlers
const authRouter = require("./routes/auth.routes");
const interviewrouter = require("./routes/interview.routes");

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewrouter);

module.exports = app;