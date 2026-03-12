import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', noPadding = false }) => {
  return (
    <div className={`bg-white border border-zinc-100 rounded-card shadow-sm overflow-hidden ${noPadding ? '' : 'p-8 lg:p-10'} ${className}`}>
      {children}
    </div>
  );
};