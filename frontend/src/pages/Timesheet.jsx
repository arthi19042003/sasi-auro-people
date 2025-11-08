import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Timesheet() {
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/timesheets', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTimesheets(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch timesheets');
      } finally {
        setLoading(false);
      }
    };
    fetchTimesheets();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Timesheet</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="text-left py-3 px-4">ID</th>
              <th className="text-left py-3 px-4">Employee</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Hours Worked</th>
            </tr>
          </thead>
          <tbody>
            {timesheets.map(ts => (
              <tr key={ts.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-3 px-4">{ts.id}</td>
                <td className="py-3 px-4">{ts.employee}</td>
                <td className="py-3 px-4">{ts.date}</td>
                <td className="py-3 px-4">{ts.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
