import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavLinkItem {
  to: string;
  icon: string;
  label: string;
}

interface SidebarNavProps {
  links: NavLinkItem[];
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ links }) => {
  return (
    <nav className="space-y-2">
        {links.map((link) => (
        <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `
            flex items-center gap-4 px-4 py-3 rounded-full transition-all font-bold text-sm
            ${isActive 
                ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                : 'text-zinc-400 hover:text-primary hover:bg-primary/5'}
            `}
        >
            <span className="material-symbols-outlined filled">{link.icon}</span>
            {link.label}
        </NavLink>
        ))}
    </nav>
  );
};
