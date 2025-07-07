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

// ====== Update Jobs
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;

  // Validation
  if (!company || !position) {
    return next("Please provide all fields.");
  }

  // Find job
  const job = await jobModel.findOne({ _id: id });

  if (!job) {
    return next(`No job found with this ID: ${id}`);
  }

  // Authorization check
  if (!req.user.userId !== job.createdBy.toString()) {
    next("You are not authorized to update this job.");
    return;
  }

  const updatedJob = await jobModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, job: updatedJob });
};

// ====== Delete Job
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;

  // find job
  const job = await jobModel.findOne({ _id: id });

  // validation
  if (!job) {
    next(`No job found with this id: ${id}`);
  }

  if (req.user.userId !== job.createdBy.toString()) {
    return next("You are not authorized to delete this job.");
  }

  await job.deleteOne();
  res.status(200).json({ message: "Success, Job info deleted!" });
};
