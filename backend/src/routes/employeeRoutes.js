// src/routes/employeeRoutes.js
import express from "express";
import {
  fetchEmployees,
  fetchEmployee,
  addEmployee,
  editEmployee,
  removeEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", fetchEmployees);
router.get("/:id", fetchEmployee);
router.post("/", addEmployee);
router.put("/:id", editEmployee);
router.delete("/:id", removeEmployee);

export default router;
