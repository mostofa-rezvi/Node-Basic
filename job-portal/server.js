// imports
// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";

// config
dotenv.config();

// mongoDB connection
connectDB();

// rest object
const app = express();

// routes
app.get("/", (req, res) => {
  res.send("<h1>Welcome to our Job Portal</h1>");
});

// port
const PORT = process.env.PORT || 5050;
const DEV = process.env.DEV_MODE;

// listen
app.listen(PORT, () => {
  console.log(`Node Server Running in ${DEV} mode on Port Number: ${PORT}`.bgYellow.black);
});
