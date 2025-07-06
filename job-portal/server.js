import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import colors from "colors";

// File imports
import connectDB from "./config/db.js";
import authRoute from "./route/authRoute.js";
import jobRoute from "./route/jobRoute.js";
import userRoute from "./route/userRoute.js";
import errorMiddleware from "../job-portal/middleware/errorMiddleware.js";

// Dotenv config
dotenv.config();

// Connect to MongoDB
connectDB();

// Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// API Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/user", userRoute);

// Global error handler
app.use(errorMiddleware);

// Port
const PORT = process.env.PORT || 5050;
const MODE = process.env.DEV_MODE;

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${MODE} mode on port ${PORT}`.bgYellow.black);
});
