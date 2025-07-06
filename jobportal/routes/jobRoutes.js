import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import createJobsController from "../controller/jobController.js";

const router = express.Router();

// routes
// Create Job || POST
router.post("/create-job", userAuth, createJobsController);

// All Jobs || GET
router.get("get-jobs", userAuth);

export default router;
