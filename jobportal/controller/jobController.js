import mongoose from "mongoose";
import moment from "moment";
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

// ====== Job Stats & Filters
export const jobStatsController = async (req, res, next) => {
  const stats = await jobModel.aggregate([
    // Search by user jobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  // default stats
  const defaultStats = {
    pending: 0,
    interview: 0,
    reject: 0,
  };
  // const defaultStats = {
  //   pending: stats.pending || 0,
  //   reject: stats.reject || 0,
  //   interview: stats.interview || 0,
  // };

  stats.forEach((item) => {
    defaultStats[item._id] = item.count;
  });

  // monthly - yearly stats
  let monthlyApplication = await jobModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        "_id.year": -1,
        "_id.month": -1,
      },
    },
    {
      $limit: 6,
    },
  ]);

  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(200).json({
    totalJob: stats.reduce((acc, curr) => acc + curr.count, 0),
    defaultStats,
    monthlyApplication,
  });
};
