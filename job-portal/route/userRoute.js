import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import { updateUserController } from "../controller/userController.js";

const router = express.Router();

router.put("/update-user", userAuth, updateUserController);

export default router;
