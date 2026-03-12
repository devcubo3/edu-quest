import React from 'react';
import { Card } from '../ui/Card';

interface StudentStatCardProps {
  title: string;
  value: string | number;
  icon: string;
  unit?: string;
  variant?: 'default' | 'primary' | 'summary';
  children?: React.ReactNode;
}

export const StudentStatCard: React.FC<StudentStatCardProps> = ({
  title,
  value,
  icon,
  unit,
  variant = 'default',
  children
}) => {
  if (variant === 'primary') {
    return (
      <Card className="relative overflow-hidden h-48 border-transparent text-white bg-gradient-to-br from-primary via-blue-600 to-indigo-700 shadow-xl shadow-primary/20">
        <div className="absolute -right-6 -top-6 size-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -left-6 -bottom-6 size-32 bg-black/10 rounded-full blur-xl"></div>
        
        <div className="flex justify-between items-center mb-4 relative z-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{title}</span>
            <span className="material-symbols-outlined text-white/80">{icon}</span>
        </div>
        <div className="relative z-10 mt-auto">
            <p className="text-2xl font-extrabold leading-tight mb-2 text-white">{value}</p>
            {children}
        </div>
      </Card>
    );
  }

  if (variant === 'summary') {
    return (
      <Card className="flex flex-col justify-between h-48 border-zinc-100 bg-white hover:border-zinc-300 transition-colors">
        <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{title}</span>
            <span className="material-symbols-outlined text-zinc-300">{icon}</span>
        </div>
        <div className="flex flex-col gap-3">
            {children}
        </div>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden group h-48 border-primary/20 bg-gradient-to-br from-white to-primary/5">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
          <span className="material-symbols-outlined text-9xl text-primary">{icon}</span>
      </div>
      <div className="flex justify-between items-center mb-4 relative z-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{title}</span>
          <div className="size-10 rounded-full bg-white shadow-sm flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">{icon}</span>
          </div>
      </div>
      <div className="flex items-end gap-2 relative z-10 mt-auto">
          <p className="text-5xl font-black text-secondary">{value}</p>
          {unit && <span className="text-xs font-bold text-primary mb-2 uppercase bg-primary/10 px-2 py-1 rounded-md">{unit}</span>}
      </div>
    </Card>
  );
};
