import { Student, Transaction, ClassItem, UserRole, User } from './types';

export interface MockNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
  iconBg: string;
  role?: UserRole;
}

export const MOCK_ADMIN_USER: User = {
  id: 'admin-1',
  name: 'Admin User',
  email: 'admin@edu.quest',
  role: UserRole.ADMIN,
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiTTzDdDBLVSdfkbEBG2wpP-CzLEwKlwbXepYrHxqSPXsdi0yWCONrG7L-6s_3I-J9uCoy851y08C_BDH-SLghJgwD9-dvy6Q8iVQQjz6vo6gjZnMDexsMwEPRDNB57SSNvPPQpemSIm40faAIOsbIktjoKx7Sno9Zhw1C-QIEmIDfMX4dWY-Cv8zmVBTuWtIZBNGWWxsZyAr-dKTlN3vxEEYKIs9Yyu9tpMs6e_YKO7mLxD0xdedapQ7cn-uxILmotCcsNFYPa9k'
};

export const MOCK_STUDENT_USER: User = {
  id: '1',
  name: 'Sarah Jenkins',
  email: 'student@edu.quest',
  role: UserRole.STUDENT,
  avatar: '',
  studentId: '#STU-2024-001',
  class: '4B'
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
    timestamp: '24 out., 09:42',
    dateMs: new Date('2024-10-24T09:42').getTime(),
    studentName: 'Sarah Jenkins',
    studentInitials: 'SJ',
    studentClass: 'Turma 4B',
    description: 'Excelência Acadêmica',
    category: 'Vencedora do Quiz de Matemática',
    amount: 500,
    type: 'credit'
  },
  {
    id: 't2',
    timestamp: '24 out., 09:15',
    dateMs: new Date('2024-10-24T09:15').getTime(),
    studentName: 'Marcus Vane',
    studentInitials: 'MV',
    studentClass: 'Turma 10A',
    description: 'Compra na Cantina',
    category: 'Combo Almoço',
    amount: 150,
    type: 'debit'
  },
  {
    id: 't3',
    timestamp: '23 out., 16:00',
    dateMs: new Date('2024-10-23T16:00').getTime(),
    studentName: 'Jason Liu',
    studentInitials: 'JL',
    studentClass: 'Turma 8C',
    description: 'Aluguel de Equipamento',
    category: 'Depósito Óculos VR',
    amount: 300,
    type: 'debit'
  },
  {
    id: 't4',
    timestamp: '23 out., 14:30',
    dateMs: new Date('2024-10-23T14:30').getTime(),
    studentName: 'Emily Mars',
    studentInitials: 'EM',
    studentClass: 'Turma 11B',
    description: 'Recompensa por Voluntariado',
    category: 'Assistente da Biblioteca',
    amount: 250,
    type: 'credit'
  },
  {
    id: 't5',
    timestamp: '23 out., 11:00',
    dateMs: new Date('2024-10-23T11:00').getTime(),
    studentName: 'David Kim',
    studentInitials: 'DK',
    studentClass: 'Turma 9A',
    description: 'Taxa de Atraso',
    category: 'Livro em Atraso na Biblioteca',
    amount: 50,
    type: 'debit'
  },
  {
    id: 't6',
    timestamp: '22 out., 09:00',
    dateMs: new Date('2024-10-22T09:00').getTime(),
    studentName: 'System Admin',
    studentInitials: 'SA',
    studentClass: 'Todas as Turmas',
    description: 'Mesada Semanal',
    category: 'Distribuição Automática',
    amount: 12500,
    type: 'credit'
  }
];

export const MOCK_NOTIFICATIONS: MockNotification[] = [
  {
    id: 'n1',
    title: 'Nova transação aprovada',
    message: 'Sarah Jenkins recebeu 500 CnaCoins por Excelência Acadêmica.',
    time: 'Há 5 minutos',
    read: false,
    icon: 'paid',
    iconBg: 'bg-green-100 text-green-600',
    role: UserRole.ADMIN
  },
  {
    id: 'n2',
    title: 'Novo aluno cadastrado',
    message: 'Lucas Ferreira foi adicionado à turma 4B com sucesso.',
    time: 'Há 20 minutos',
    read: false,
    icon: 'person_add',
    iconBg: 'bg-blue-100 text-blue-600',
    role: UserRole.ADMIN
  },
  {
    id: 'n3',
    title: 'Relatório semanal disponível',
    message: 'O relatório de transações da semana já está disponível para download.',
    time: 'Há 2 horas',
    read: true,
    icon: 'bar_chart',
    iconBg: 'bg-purple-100 text-purple-600',
    role: UserRole.ADMIN
  },
  {
    id: 'n4',
    title: 'Limite de moedas atingido',
    message: 'Emma Larson atingiu o limite máximo de 3.100 CnaCoins este mês.',
    time: 'Há 1 dia',
    read: true,
    icon: 'warning',
    iconBg: 'bg-amber-100 text-amber-600',
    role: UserRole.ADMIN
  },
  {
    id: 'n5',
    title: 'Você recebeu CnaCoins!',
    message: 'Parabéns! Você ganhou 250 CnaCoins por Participação em Aula.',
    time: 'Há 10 minutos',
    read: false,
    icon: 'emoji_events',
    iconBg: 'bg-yellow-100 text-yellow-600',
    role: UserRole.STUDENT
  },
  {
    id: 'n6',
    title: 'Novo ranking disponível',
    message: 'O ranking da turma English Advanced 2 foi atualizado. Você está em 2º lugar!',
    time: 'Há 1 hora',
    read: false,
    icon: 'leaderboard',
    iconBg: 'bg-blue-100 text-blue-600',
    role: UserRole.STUDENT
  },
  {
    id: 'n7',
    title: 'Lembrete de atividade',
    message: 'Você tem uma atividade pendente em Inglês Avançado com prazo para amanhã.',
    time: 'Há 3 horas',
    read: true,
    icon: 'assignment',
    iconBg: 'bg-orange-100 text-orange-600',
    role: UserRole.STUDENT
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