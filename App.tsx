import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { TransactionsProvider } from './context/TransactionsContext';
import { StudentsProvider } from './context/StudentsContext';
import { ClassesProvider } from './context/ClassesContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Students } from './pages/admin/Students';
import { Classes } from './pages/admin/Classes';
import { ClassDetail } from './pages/admin/ClassDetail';
import { Transactions } from './pages/admin/Transactions';
import { Settings } from './pages/admin/Settings';
import { AdminProfile } from './pages/admin/AdminProfile';
import { Notifications } from './pages/admin/Notifications';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentProfile } from './pages/student/StudentProfile';
import { StudentHistory } from './pages/student/StudentHistory';
import { StudentRanking } from './pages/student/StudentRanking';
import { StudentNotifications } from './pages/student/StudentNotifications';
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
        <Route path="classes/:classId" element={<ClassDetail />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="notifications" element={<Notifications />} />
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
        <Route path="notifications" element={<StudentNotifications />} />
      </Route>
    </Routes>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StudentsProvider>
          <ClassesProvider>
            <TransactionsProvider>
              <HashRouter>
                <AppRoutes />
              </HashRouter>
            </TransactionsProvider>
          </ClassesProvider>
        </StudentsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
