// src/controllers/employeeController.js
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../models/employeeModel.js";

// ✅ Get all employees
export const fetchEmployees = async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.json(employees);
  } catch (err) {
    console.error("Fetch employees error:", err);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

// ✅ Get single employee
export const fetchEmployee = async (req, res) => {
  try {
    const employee = await getEmployeeById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    console.error("Fetch employee error:", err);
    res.status(500).json({ error: "Failed to fetch employee" });
  }
};

// ✅ Create new employee
export const addEmployee = async (req, res) => {
  try {
    const newEmployee = await createEmployee(req.body);
    res.status(201).json(newEmployee[0]);
  } catch (err) {
    console.error("Add employee error:", err);
    res.status(500).json({ error: "Failed to create employee" });
  }
};

// ✅ Update employee
export const editEmployee = async (req, res) => {
  try {
    const updated = await updateEmployee(req.params.id, req.body);
    if (updated.length === 0)
      return res.status(404).json({ message: "Employee not found" });
    res.json(updated[0]);
  } catch (err) {
    console.error("Update employee error:", err);
    res.status(500).json({ error: "Failed to update employee" });
  }
};

// ✅ Delete employee
export const removeEmployee = async (req, res) => {
  try {
    const deleted = await deleteEmployee(req.params.id);
    if (deleted === 0)
      return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Delete employee error:", err);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};
