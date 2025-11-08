// backend/src/controllers/employeeController.js
import db from "../db.js";

// ✅ Get all employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await db("employees").select("*");
    res.json(employees);
  } catch (error) {
    console.error("Get Employees Error:", error);
    res.status(500).json({ message: "Failed to fetch employees" });
  }
};

// ✅ Get employee by ID
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await db("employees").where({ id }).first();

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    console.error("Get Employee by ID Error:", error);
    res.status(500).json({ message: "Failed to fetch employee" });
  }
};

// ✅ Create new employee
export const createEmployee = async (req, res) => {
  try {
    const { name, email, role, department } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const existing = await db("employees").where({ email }).first();
    if (existing) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    const [newEmployee] = await db("employees")
      .insert({ name, email, role, department })
      .returning("*");

    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Create Employee Error:", error);
    res.status(500).json({ message: "Failed to create employee" });
  }
};

// ✅ Update employee
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, department } = req.body;

    const [updated] = await db("employees")
      .where({ id })
      .update({ name, email, role, department })
      .returning("*");

    if (!updated) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee updated successfully", employee: updated });
  } catch (error) {
    console.error("Update Employee Error:", error);
    res.status(500).json({ message: "Failed to update employee" });
  }
};

// ✅ Delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db("employees").where({ id }).del();

    if (!deleted) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Delete Employee Error:", error);
    res.status(500).json({ message: "Failed to delete employee" });
  }
};
