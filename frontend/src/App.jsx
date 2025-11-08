import React, { useEffect } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Employees from './pages/Employees.jsx';
import Timesheet from './pages/Timesheet.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { logout, fetchMe } from './slices/authSlice.js';

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) dispatch(fetchMe());
  }, [dispatch, token]);

  const doLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {token && user && (
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              AP
            </div>
            <h1 className="text-xl font-semibold text-blue-600">AURO People</h1>
          </div>

          <nav className="space-x-4">
            <Link to="/" className="text-sm text-slate-600 hover:text-blue-600">Dashboard</Link>
            <Link to="/employees" className="text-sm text-slate-600 hover:text-blue-600">Employees</Link>
            <Link to="/timesheet" className="text-sm text-slate-600 hover:text-blue-600">Timesheet</Link>
            <button onClick={doLogout} className="text-sm text-red-500 ml-4">Logout</button>
          </nav>
        </header>
      )}

      <main className="p-6">
        <Routes>
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/" replace />} />
          <Route path="/register" element={!token ? <Register /> : <Navigate to="/" replace />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
          <Route path="/timesheet" element={<ProtectedRoute><Timesheet /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to={token ? "/" : "/login"} replace />} />
        </Routes>
      </main>
    </div>
  );
}
