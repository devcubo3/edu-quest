import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { UserRole } from '../../types';
import { HeaderLogo } from './HeaderLogo';
import { HeaderProfile } from './HeaderProfile';
import { MOCK_NOTIFICATIONS } from '../../constants';
import { useStudents } from '../../context/StudentsContext';

interface HeaderProps {
  action?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ action }) => {
  const { user, logout } = useAuth();
  const { branding } = useTheme();
  const { students } = useStudents();
  const navigate = useNavigate();

  const studentRecord = students.find(s => s.id === user?.id);
  const initials = studentRecord?.initials ?? (user?.name?.split(' ').map(w => w[0]).join('').slice(0, 2) ?? '');
  const colorClass = studentRecord?.colorClass ?? 'bg-zinc-100 text-zinc-600';

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoClick = () => {
    if (user?.role === UserRole.ADMIN) {
      navigate('/admin/dashboard');
    } else {
      navigate('/student/dashboard');
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(prev => !prev);
    setShowProfileMenu(false);
  };

  const handleProfileClick = () => {
    setShowProfileMenu(prev => !prev);
    setShowNotifications(false);
  };

  const handleSettings = () => {
    setShowProfileMenu(false);
    if (user?.role === UserRole.ADMIN) {
      navigate('/admin/profile');
    } else {
      navigate('/student/profile');
    }
  };

  const handleLogout = () => {
    setShowProfileMenu(false);
    logout();
    navigate('/login');
  };

  const notifications = MOCK_NOTIFICATIONS.filter(n => n.role === user?.role);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-zinc-100 bg-white/80 backdrop-blur-md sticky top-0 z-40 h-[80px]">
      <HeaderLogo
        logoUrl={branding.logoUrl}
        companyName={branding.companyName}
        onClick={handleLogoClick}
      />

      {/* Right Side: Actions & Profile */}
      <div className="flex items-center gap-4">
        {action}

        <div className="h-8 w-px bg-zinc-200 hidden md:block"></div>

        {/* Notification Bell */}
        <div ref={notifRef} className="relative">
          <button
            onClick={handleNotificationClick}
            className="size-10 flex items-center justify-center rounded-full hover:bg-zinc-100 text-zinc-400 transition-colors relative"
          >
            <span className="material-symbols-outlined">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-white"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-zinc-100 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between">
                <h3 className="font-bold text-sm text-zinc-800">Notificações</h3>
                {unreadCount > 0 && (
                  <span className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>
                    {unreadCount} {unreadCount === 1 ? 'nova' : 'novas'}
                  </span>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-zinc-50">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-sm text-zinc-400">
                    <span className="material-symbols-outlined text-3xl block mb-2 text-zinc-300">notifications_off</span>
                    Nenhuma notificação
                  </div>
                ) : (
                  notifications.map(notif => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 hover:bg-zinc-50 transition-colors cursor-pointer flex gap-3 items-start ${!notif.read ? 'bg-blue-50/40' : ''}`}
                    >
                      <div className={`size-9 rounded-full flex items-center justify-center flex-shrink-0 ${notif.iconBg}`}>
                        <span className="material-symbols-outlined text-[18px]">{notif.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-zinc-800 leading-tight">{notif.title}</p>
                        <p className="text-xs text-zinc-500 mt-0.5 leading-snug">{notif.message}</p>
                        <p className="text-[10px] text-zinc-400 mt-1">{notif.time}</p>
                      </div>
                      {!notif.read && (
                        <div className="size-2 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: 'var(--color-primary)' }}></div>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="px-4 py-3 border-t border-zinc-100 text-center">
                <button
                  onClick={() => { setShowNotifications(false); navigate(user?.role === UserRole.ADMIN ? '/admin/notifications' : '/student/notifications'); }}
                  className="text-xs font-semibold hover:underline"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Ver todas as notificações
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <HeaderProfile
            name={user?.name}
            role={user?.role}
            avatar={user?.avatar}
            initials={initials}
            colorClass={colorClass}
            onClick={handleProfileClick}
          />

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 top-12 w-52 bg-white rounded-2xl shadow-xl border border-zinc-100 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-zinc-100">
                <p className="text-sm font-bold text-zinc-800 truncate">{user?.name}</p>
                <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mt-0.5">
                  {user?.role === UserRole.ADMIN ? 'Administrador' : 'Aluno'}
                </p>
              </div>

              <div className="py-1">
                <button
                  onClick={handleSettings}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px] text-zinc-400">settings</span>
                  Configurações
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px] text-red-400">logout</span>
                  Sair
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
