import React from 'react';
import { UserRole } from '../../types';

interface HeaderProfileProps {
  name?: string;
  role?: UserRole;
  avatar?: string;
  initials?: string;
  colorClass?: string;
  onClick: () => void;
}

export const HeaderProfile: React.FC<HeaderProfileProps> = ({ name, role, avatar, initials, colorClass, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="hidden md:flex items-center gap-3 pl-2 cursor-pointer group select-none"
    >
      <div className="text-right group-hover:opacity-70 transition-opacity">
        <p className="text-sm font-bold leading-none">{name}</p>
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mt-1">{role === UserRole.ADMIN ? 'Administrador' : 'Aluno'}</p>
      </div>
      <div className={`size-10 rounded-full overflow-hidden ring-2 ring-white shadow-lg group-hover:scale-105 transition-transform duration-200 flex items-center justify-center text-xs font-bold ${avatar ? 'bg-zinc-200' : (colorClass ?? 'bg-zinc-100 text-zinc-600')}`}>
        {avatar
          ? <img src={avatar} alt={name} className="h-full w-full object-cover" />
          : <span>{initials}</span>
        }
      </div>
    </div>
  );
};
