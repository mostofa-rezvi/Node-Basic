import express from "express";
import { testPostController } from "../controllers/testController.js";

// router object
const router = express.Router();

// routes
router.get("/test-post", testPostController);
router.post("/test-post", testPostController);

// export
export default router;
