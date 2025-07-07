import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import {
  createJobsController,
  deleteJobController,
  getAllJobController,
  updateJobController,
} from "../controller/jobController.js";

const router = express.Router();

// routes
// Create Job || POST
router.post("/create-job", userAuth, createJobsController);

// All Jobs || GET
router.get("/get-job", userAuth, getAllJobController);

// Update Jobs || PATCH
router.patch("/update-job/:id", userAuth, updateJobController);

// Delete Job || DELETE
router.delete("/delete-job/:id", userAuth, deleteJobController);

export default router;
