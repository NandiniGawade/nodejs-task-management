import express from "express";
import {
  getTaskById,
  getTasks,
  createTask,
  DeleteTask,
  updateTask,
} from "../controllers/taskController.js";
const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getTasks);
router
  .route("/:id")
  .get(getTaskById)
  .delete(protect, DeleteTask)
  .put(protect, updateTask);
router.route("/create").post(protect, createTask);

export default router;