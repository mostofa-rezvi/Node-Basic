import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import createJobController from "../controller/jobController.js";

const router = express.Router();

router.post("/create-job", userAuth, createJobController);

export default router;
