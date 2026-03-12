import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { UserRole } from '../../types';
import { HeaderLogo } from './HeaderLogo';
import { HeaderProfile } from './HeaderProfile';

interface HeaderProps {
  action?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ action }) => {
  const { user } = useAuth();
  const { branding } = useTheme();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (user?.role === UserRole.STUDENT) {
      navigate('/student/profile');
    }
    // Admin profile logic can be added here
  };

  const handleLogoClick = () => {
    if (user?.role === UserRole.ADMIN) {
      navigate('/admin/dashboard');
    } else {
      navigate('/student/dashboard');
    }
  };

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
        
        {user?.role === UserRole.ADMIN && (
          <button className="size-10 flex items-center justify-center rounded-full hover:bg-zinc-100 text-zinc-400 transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-white"></span>
          </button>
        )}
        
        <HeaderProfile 
          name={user?.name} 
          role={user?.role} 
          avatar={user?.avatar} 
          onClick={handleProfileClick} 
        />
      </div>
    </header>
  );
};