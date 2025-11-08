import React from 'react';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h2>
        <p className="mb-6">Email: {user?.email}</p>
      </div>
    </div>
  );
}
