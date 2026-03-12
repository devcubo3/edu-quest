export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  studentId?: string;
  class?: string;
}

export interface Student {
  id: string;
  studentId: string; // e.g. STU-2024-001
  name: string;
  class: string;
  coins: number;
  avatar: string;
  initials: string;
  colorClass: string; // e.g. bg-blue-100 text-blue-600
}

export interface Transaction {
  id: string;
  timestamp: string;
  studentName: string;
  studentInitials: string;
  studentClass: string;
  description: string;
  category: string;
  amount: number;
  type: 'credit' | 'debit';
}

export interface ClassItem {
  id: string;
  name: string;
  department: string;
  room: string;
  studentsCount: number;
  schedule: string; // e.g., "Morning Session"
  color: string; // Tailwind color class for dot
}

export interface BrandingConfig {
  companyName: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string | null;
  iconUrl: string | null;
}