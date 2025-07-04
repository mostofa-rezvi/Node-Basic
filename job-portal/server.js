// packages imports
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";

// files imports
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRoutes.js";

// config
dotenv.config();

// mongoDB connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to our Job Portal</h1>");
// });
app.use("/api/v1/test", testRoutes);

// port
const PORT = process.env.PORT || 5050;
const DEV = process.env.DEV_MODE;

// listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running in ${DEV} mode on Port Number: ${PORT}`.bgYellow.black
  );
});
