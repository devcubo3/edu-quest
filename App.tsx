import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Students } from './pages/admin/Students';
import { Classes } from './pages/admin/Classes';
import { Transactions } from './pages/admin/Transactions';
import { Settings } from './pages/admin/Settings';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentProfile } from './pages/student/StudentProfile';
import { StudentHistory } from './pages/student/StudentHistory';
import { StudentRanking } from './pages/student/StudentRanking';
import { UserRole } from './types';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="classes" element={<Classes />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Student Routes */}
      <Route path="/student" element={
        <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="history" element={<StudentHistory />} />
        <Route path="ranking" element={<StudentRanking />} />
      </Route>
    </Routes>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}