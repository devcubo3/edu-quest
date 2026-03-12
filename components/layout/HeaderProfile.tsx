import React from 'react';
import { UserRole } from '../../types';

interface HeaderProfileProps {
  name?: string;
  role?: UserRole;
  avatar?: string;
  onClick: () => void;
}

export const HeaderProfile: React.FC<HeaderProfileProps> = ({ name, role, avatar, onClick }) => {
  return (
    <div 
        onClick={onClick}
        className="hidden md:flex items-center gap-3 pl-2 cursor-pointer group select-none"
    >
        <div className="text-right group-hover:opacity-70 transition-opacity">
        <p className="text-sm font-bold leading-none">{name}</p>
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mt-1">{role === UserRole.ADMIN ? 'Administrador' : 'Aluno'}</p>
        </div>
        <div className="size-10 bg-zinc-200 rounded-full overflow-hidden ring-2 ring-white shadow-lg group-hover:scale-105 transition-transform duration-200">
        <img src={avatar} alt="User" className="h-full w-full object-cover" />
        </div>
    </div>
  );
};
