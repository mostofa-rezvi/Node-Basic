import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import colors from "colors";

// File imports
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorMiddleware from "../jobportal/middleware/errorMiddleware.js";

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
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/user", userRoutes);

// Global error handler
app.use(errorMiddleware);

// Port
const PORT = process.env.PORT || 5050;
const MODE = process.env.DEV_MODE;

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${MODE} mode on port ${PORT}`.bgYellow.black);
});
