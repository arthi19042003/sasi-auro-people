// src/models/employeeModel.js
import db from "../db.js";

export const getAllEmployees = () => db("employees").select("*");

export const getEmployeeById = (id) =>
  db("employees").where({ id }).first();

export const createEmployee = (employeeData) =>
  db("employees").insert(employeeData).returning("*");

export const updateEmployee = (id, employeeData) =>
  db("employees").where({ id }).update(employeeData).returning("*");

export const deleteEmployee = (id) =>
  db("employees").where({ id }).del();
