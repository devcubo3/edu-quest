import React from 'react';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <Outlet />
      </div>
    </div>
  );
};