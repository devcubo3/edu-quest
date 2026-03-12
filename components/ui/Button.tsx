import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: string;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  icon,
  isLoading,
  className = '',
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-bold transition-all rounded-pill disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:opacity-90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5",
    secondary: "bg-zinc-100 text-black hover:bg-zinc-200",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-zinc-500 hover:text-primary hover:bg-primary/5",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-red-500/20"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="material-symbols-outlined animate-spin text-lg mr-2">progress_activity</span>
      ) : icon ? (
        <span className="material-symbols-outlined text-lg mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};