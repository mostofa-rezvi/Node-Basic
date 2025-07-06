import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import createJobsController from "../controllers/jobsController.js";

const router = express.Router();

router.post("/create-job", userAuth, createJobsController);

export default router;
