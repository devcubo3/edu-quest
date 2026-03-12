import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { UserRole } from '../../types';
import { SidebarLogo } from './SidebarLogo';
import { SidebarNav } from './SidebarNav';

export const Sidebar: React.FC = () => {
  const { branding } = useTheme();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === UserRole.ADMIN;

  const adminLinks = [
    { to: '/admin/dashboard', icon: 'dashboard', label: 'Visão Geral' },
    { to: '/admin/students', icon: 'group', label: 'Alunos' },
    { to: '/admin/classes', icon: 'class', label: 'Turmas' },
    { to: '/admin/transactions', icon: 'swap_horiz', label: 'Transações' },
    { to: '/admin/settings', icon: 'settings', label: 'Configurações' },
  ];

  const studentLinks = [
    { to: '/student/dashboard', icon: 'shield_person', label: 'Início' },
    { to: '/student/ranking', icon: 'leaderboard', label: 'Ranking' },
    { to: '/student/history', icon: 'history', label: 'Histórico' },
    // Profile link removed as it is now accessed via Header
  ];

  const links = isAdmin ? adminLinks : studentLinks;

  return (
    <aside className="w-64 border-r border-zinc-100 h-screen bg-white flex flex-col justify-between py-8 px-6 hidden lg:flex sticky top-0">
      <div>
        <SidebarLogo 
          logoUrl={branding.logoUrl} 
          companyName={branding.companyName} 
        />
        
        <SidebarNav links={links} />
      </div>

      <div className="px-2">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all group"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          <span className="text-xs font-bold uppercase tracking-wider">Sair</span>
        </button>
      </div>
    </aside>
  );
};