import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, action }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-1">{subtitle}</p>
        <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-zinc-900">{title}</h1>
      </div>
      {action && (
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          {action}
        </div>
      )}
    </div>
  );
};
