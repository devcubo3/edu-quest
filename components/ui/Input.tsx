import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, icon, error, className = '', ...props }) => {
  return (
    <div className="space-y-2 w-full">
      {label && <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-3">{label}</label>}
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-zinc-400 group-focus-within:text-primary transition-colors">{icon}</span>
          </div>
        )}
        <input 
          className={`
            w-full bg-white border border-zinc-200 
            rounded-full py-3.5 text-sm font-medium focus:ring-2 focus:ring-primary/20
            focus:border-primary outline-none transition-all
            placeholder:text-zinc-400
            ${icon ? 'pl-11 pr-4' : 'px-6'}
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 ml-3">{error}</p>}
    </div>
  );
};