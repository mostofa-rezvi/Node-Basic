import jobModel from "../models/jobModel.js";

// ====== Create Job
export const createJobsController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return next("Company and position are required.");
  }

  req.body.createdBy = req.user.userId;
  const job = await jobModel.create(req.body);

  res.status(201).json({ success: true, job });
};

// ====== All Jobs
export const getAllJobController = async (req, res, next) => {
  req.body.createdBy = req.user.userId;

  const jobs = await jobModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs: jobs.length,
    jobs,
  });
};
