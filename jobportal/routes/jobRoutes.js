import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import {
  createJobsController,
  getAllJobController,
  updateJobController,
} from "../controller/jobController.js";

const router = express.Router();

// routes
// Create Job || POST
router.post("/create-job", userAuth, createJobsController);

// All Jobs || GET
router.get("/get-job", userAuth, getAllJobController);

// Update Jobs || PUT || PATCH
router.patch("/update-job/:id", userAuth, updateJobController);

export default router;
