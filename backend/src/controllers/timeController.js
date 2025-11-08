// backend/src/controllers/timeController.js
import db from "../db.js";

// ✅ Add new time entry
export const addTimeEntry = async (req, res) => {
  try {
    const { employee_id, date, hours_worked, project, description } = req.body;

    if (!employee_id || !date || !hours_worked) {
      return res
        .status(400)
        .json({ message: "employee_id, date, and hours_worked are required" });
    }

    const [newEntry] = await db("time_entries")
      .insert({
        employee_id,
        date,
        hours_worked,
        project,
        description,
      })
      .returning("*");

    res
      .status(201)
      .json({ message: "Time entry added successfully", entry: newEntry });
  } catch (error) {
    console.error("Add Time Entry Error:", error);
    res.status(500).json({ message: "Failed to add time entry" });
  }
};

// ✅ Get all time entries
export const getTimeEntries = async (req, res) => {
  try {
    const entries = await db("time_entries")
      .select("time_entries.*", "employees.name as employee_name")
      .leftJoin("employees", "time_entries.employee_id", "employees.id")
      .orderBy("time_entries.date", "desc");

    res.json(entries);
  } catch (error) {
    console.error("Get Time Entries Error:", error);
    res.status(500).json({ message: "Failed to fetch time entries" });
  }
};

// ✅ Update time entry
export const updateTimeEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, hours_worked, project, description } = req.body;

    const [updated] = await db("time_entries")
      .where({ id })
      .update({ date, hours_worked, project, description })
      .returning("*");

    if (!updated) {
      return res.status(404).json({ message: "Time entry not found" });
    }

    res.json({ message: "Time entry updated successfully", entry: updated });
  } catch (error) {
    console.error("Update Time Entry Error:", error);
    res.status(500).json({ message: "Failed to update time entry" });
  }
};

// ✅ Delete time entry
export const deleteTimeEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db("time_entries").where({ id }).del();

    if (!deleted) {
      return res.status(404).json({ message: "Time entry not found" });
    }

    res.json({ message: "Time entry deleted successfully" });
  } catch (error) {
    console.error("Delete Time Entry Error:", error);
    res.status(500).json({ message: "Failed to delete time entry" });
  }
};
