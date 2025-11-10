// src/pages/EmployeePage.jsx
import React, { useEffect, useState } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";
import EmployeeProfile from "../components/EmployeeProfile";

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState(null);
  const [newForm, setNewForm] = useState({});

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  const handleSave = async (data) => {
    if (data.id) {
      await updateEmployee(data.id, data);
    } else {
      await createEmployee(data);
    }
    fetchEmployees();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await deleteEmployee(id);
      fetchEmployees();
      setSelected(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Employee Management
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Employee List */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-600">Employees</h3>
          <ul>
            {employees.map((emp) => (
              <li
                key={emp.id}
                className={`p-2 rounded cursor-pointer hover:bg-blue-100 ${
                  selected?.id === emp.id ? "bg-blue-200" : ""
                }`}
                onClick={() => setSelected(emp)}
              >
                {emp.name} - {emp.job_title}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-blue-600">
              Add New Employee
            </h3>
            <div className="grid grid-cols-2 gap-2">
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
                <input
                  key={field}
                  placeholder={field.replace("_", " ")}
                  className="border rounded-lg p-2 text-sm"
                  value={newForm[field] || ""}
                  onChange={(e) =>
                    setNewForm({ ...newForm, [field]: e.target.value })
                  }
                />
              ))}
            </div>
            <button
              onClick={() => {
                handleSave(newForm);
                setNewForm({});
              }}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Add Employee
            </button>
          </div>
        </div>

        {/* Right: Employee Profile */}
        <div>
          {selected ? (
            <EmployeeProfile
              employee={selected}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-600">
              Select an employee to view profile
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
