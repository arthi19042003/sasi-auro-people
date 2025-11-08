// backend/src/routes/employeeRoutes.js
import express from "express";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// ✅ GET all employees
router.get("/", verifyToken, getAllEmployees);

// ✅ GET employee by ID
router.get("/:id", verifyToken, getEmployeeById);

// ✅ CREATE new employee
router.post("/", verifyToken, createEmployee);

// ✅ UPDATE employee
router.put("/:id", verifyToken, updateEmployee);

// ✅ DELETE employee
router.delete("/:id", verifyToken, deleteEmployee);

export default router;
