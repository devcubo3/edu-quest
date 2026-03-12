import React from 'react';
import { Card } from '../ui/Card';

interface AdminStatCardProps {
  title: string;
  value: string | number;
  icon: string;
  badgeText: string;
  badgeType?: 'success' | 'neutral' | 'warning' | 'danger';
}

export const AdminStatCard: React.FC<AdminStatCardProps> = ({ 
  title, 
  value, 
  icon, 
  badgeText, 
  badgeType = 'neutral' 
}) => {
  
  const badgeStyles = {
    success: 'bg-green-100 text-green-700',
    neutral: 'bg-zinc-200 text-zinc-600',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
  };

  return (
    <Card className="flex flex-col justify-between h-48 group hover:border-zinc-300 transition-all bg-zinc-50">
      <div className="flex justify-between items-start">
        <div className="p-3 bg-white rounded-[16px] shadow-sm">
          <span className="material-symbols-outlined text-black">{icon}</span>
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${badgeStyles[badgeType]}`}>
          {badgeText}
        </span>
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">{title}</p>
        <h3 className="text-4xl font-black text-secondary">{value}</h3>
      </div>
    </Card>
  );
};
