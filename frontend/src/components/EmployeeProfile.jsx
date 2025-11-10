// src/components/EmployeeProfile.jsx
import React, { useState } from "react";

const EmployeeProfile = ({ employee, onSave, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(employee || {});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    onSave(form);
    setEditMode(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">
        {editMode ? "Edit Employee" : "Employee Profile"}
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {[
          "employee_id",
          "name",
          "email",
          "phone",
          "department",
          "job_title",
          "reporting_manager",
          "employment_type",
          "salary",
        ].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-sm text-gray-600 capitalize">
              {field.replace("_", " ")}
            </label>
            {editMode ? (
              <input
                className="border rounded-lg p-2 text-sm"
                name={field}
                value={form[field] || ""}
                onChange={handleChange}
              />
            ) : (
              <p className="p-2 text-gray-800">{employee[field]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(employee.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfile;
