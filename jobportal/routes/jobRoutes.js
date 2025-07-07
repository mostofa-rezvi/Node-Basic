import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import {
  createJobsController,
  deleteJobController,
  getAllJobController,
  updateJobController,
} from "../controller/jobController.js";
// import jobModel from "../models/jobModel.js";

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

// Bulk Insert Jobs || POST
// router.post("/bulk-insert", userAuth, async (req, res, next) => {
//   try {
//     const jobs = req.body;

//     if (!Array.isArray(jobs) || jobs.length === 0) {
//       return res.status(400).json({ message: "No job data provided." });
//     }

//     const jobsWithUser = jobs.map((job) => ({
//       ...job,
//       createdBy: req.user.userId,
//     }));

//     const insertedJobs = await jobModel.insertMany(jobsWithUser);
//     res.status(201).json({
//       message: `${insertedJobs.length} jobs inserted successfully.`,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

export default router;
