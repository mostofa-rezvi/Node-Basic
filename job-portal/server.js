// packages imports
import express from "express";
import "express-async-error";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
// files imports
import connectDB from "./config/db.js";
// routes imports
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middelwares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";

// config
dotenv.config();

// mongoDB connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

// validation middelware
app.use(errorMiddleware);

// port
const PORT = process.env.PORT || 5050;
const DEV = process.env.DEV_MODE;

// listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running in ${DEV} mode on Port Number: ${PORT}`.bgYellow.black
  );
});
