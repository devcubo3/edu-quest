import { Student, Transaction, ClassItem, UserRole, User } from './types';

export const MOCK_ADMIN_USER: User = {
  id: 'admin-1',
  name: 'Admin User',
  email: 'admin@edu.quest',
  role: UserRole.ADMIN,
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiTTzDdDBLVSdfkbEBG2wpP-CzLEwKlwbXepYrHxqSPXsdi0yWCONrG7L-6s_3I-J9uCoy851y08C_BDH-SLghJgwD9-dvy6Q8iVQQjz6vo6gjZnMDexsMwEPRDNB57SSNvPPQpemSIm40faAIOsbIktjoKx7Sno9Zhw1C-QIEmIDfMX4dWY-Cv8zmVBTuWtIZBNGWWxsZyAr-dKTlN3vxEEYKIs9Yyu9tpMs6e_YKO7mLxD0xdedapQ7cn-uxILmotCcsNFYPa9k'
};

export const MOCK_STUDENT_USER: User = {
  id: 'stu-1',
  name: 'Alex Johnson',
  email: 'student@edu.quest',
  role: UserRole.STUDENT,
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWlP4DVvqKuWF6kZ5qWE6QG9MuyL-Bfz4IkDVsH3cweU_UMa6pHEuMqa-KXVsjq9dYtGr7gPBlhs_Cj2PACcP_2bTcN4hb66wzYYPZvPyX0h3jd9SUATzqpH1uixUNzTAdSa4zIcCV6UiDTxGpK3-IO6YyR19T5Gx5EADYsWqcUsPsqMVxDbq6r8p3UYchElEpcnx6XgeZidfSUnICbDGjjYHVF_HhH7rCvsbH6V2TQi_5MzEPbLOX4XDPGyZuTcw95G2ue-68Lys',
  studentId: 'STU-884-24',
  class: 'English Advanced 2'
};

export const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    studentId: '#STU-2024-001',
    name: 'Sarah Jenkins',
    class: '4B',
    coins: 1250,
    avatar: '',
    initials: 'SJ',
    colorClass: 'bg-blue-100 text-blue-600'
  },
  {
    id: '2',
    studentId: '#STU-2024-045',
    name: 'Marcus Vane',
    class: '5A',
    coins: 890,
    avatar: '',
    initials: 'MV',
    colorClass: 'bg-purple-100 text-purple-600'
  },
  {
    id: '3',
    studentId: '#STU-2024-112',
    name: 'Anna Lee',
    class: '4B',
    coins: 2400,
    avatar: '',
    initials: 'AL',
    colorClass: 'bg-green-100 text-green-600'
  },
  {
    id: '4',
    studentId: '#STU-2024-088',
    name: 'David Kim',
    class: '6C',
    coins: 150,
    avatar: '',
    initials: 'DK',
    colorClass: 'bg-amber-100 text-amber-600'
  },
  {
    id: '5',
    studentId: '#STU-2024-201',
    name: 'Emma Larson',
    class: '5A',
    coins: 3100,
    avatar: '',
    initials: 'EL',
    colorClass: 'bg-pink-100 text-pink-600'
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    timestamp: 'Oct 24, 09:42 AM',
    studentName: 'Sarah Jenkins',
    studentInitials: 'SJ',
    studentClass: 'Class 4B',
    description: 'Academic Excellence',
    category: 'Math Quiz Winner',
    amount: 500,
    type: 'credit'
  },
  {
    id: 't2',
    timestamp: 'Oct 24, 09:15 AM',
    studentName: 'Marcus Vane',
    studentInitials: 'MV',
    studentClass: 'Class 10A',
    description: 'Cafeteria Purchase',
    category: 'Lunch Bundle',
    amount: 150,
    type: 'debit'
  },
  {
    id: 't3',
    timestamp: 'Oct 23, 04:00 PM',
    studentName: 'Jason Liu',
    studentInitials: 'JL',
    studentClass: 'Class 8C',
    description: 'Equipment Rental',
    category: 'VR Headset Deposit',
    amount: 300,
    type: 'debit'
  },
  {
    id: 't4',
    timestamp: 'Oct 23, 02:30 PM',
    studentName: 'Emily Mars',
    studentInitials: 'EM',
    studentClass: 'Class 11B',
    description: 'Volunteering Reward',
    category: 'Library Assistant',
    amount: 250,
    type: 'credit'
  },
  {
    id: 't5',
    timestamp: 'Oct 23, 11:00 AM',
    studentName: 'David Kim',
    studentInitials: 'DK',
    studentClass: 'Class 9A',
    description: 'Late Fee',
    category: 'Library Book Overdue',
    amount: 50,
    type: 'debit'
  },
  {
    id: 't6',
    timestamp: 'Oct 22, 09:00 AM',
    studentName: 'System Admin',
    studentInitials: 'SA',
    studentClass: 'All Classes',
    description: 'Weekly Allowance',
    category: 'Automated Distribution',
    amount: 12500,
    type: 'credit'
  }
];

export const MOCK_CLASSES: ClassItem[] = [
  {
    id: 'c1',
    name: 'Advanced Physics',
    department: 'Science Dept',
    room: 'Room 302',
    studentsCount: 24,
    schedule: 'Afternoon Session',
    color: 'bg-green-500'
  },
  {
    id: 'c2',
    name: 'Calculus 101',
    department: 'Math Dept',
    room: 'Room 104',
    studentsCount: 18,
    schedule: 'Morning Session',
    color: 'bg-blue-500'
  },
  {
    id: 'c3',
    name: 'World History',
    department: 'Humanities',
    room: 'Room 205',
    studentsCount: 32,
    schedule: 'Morning Session',
    color: 'bg-amber-500'
  },
  {
    id: 'c4',
    name: 'Chemistry Lab',
    department: 'Science Dept',
    room: 'Lab 4',
    studentsCount: 12,
    schedule: 'Afternoon Session',
    color: 'bg-purple-500'
  },
  {
    id: 'c5',
    name: 'Literature 4A',
    department: 'Humanities',
    room: 'Room 101',
    studentsCount: 28,
    schedule: 'Morning Session',
    color: 'bg-pink-500'
  }
];