// backend/src/routes/timeRoutes.js
import express from "express";
import {
  addTimeEntry,
  getTimeEntries,
  updateTimeEntry,
  deleteTimeEntry,
} from "../controllers/timeController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// ✅ Add new time entry
router.post("/", verifyToken, addTimeEntry);

// ✅ Get all time entries
router.get("/", verifyToken, getTimeEntries);

// ✅ Update time entry
router.put("/:id", verifyToken, updateTimeEntry);

// ✅ Delete time entry
router.delete("/:id", verifyToken, deleteTimeEntry);

export default router;
