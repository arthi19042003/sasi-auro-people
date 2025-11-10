// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EmployeePage from "./pages/EmployeePage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/employees" />} />

          {/* Employee Management Page */}
          <Route path="/employees" element={<EmployeePage />} />

          {/* 404 Fallback */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center h-screen text-gray-600">
                <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
                <a
                  href="/employees"
                  className="text-blue-500 hover:underline"
                >
                  Go to Employee Management
                </a>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
