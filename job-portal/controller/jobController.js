import jobsModel from "../model/jobModel.js";

// Create Job
export const createJobsController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return next("Company and position are required.");
  }

  req.body.createdBy = req.user.userId;
  const job = await jobsModel.create(req.body);

  res.status(201).json({ success: true, job });
};
