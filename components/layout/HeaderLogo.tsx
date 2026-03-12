import React from 'react';

interface HeaderLogoProps {
  logoUrl: string | null;
  companyName: string;
  onClick: () => void;
}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({ logoUrl, companyName, onClick }) => {
  return (
    <div 
        onClick={onClick}
        className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
    >
        {logoUrl ? (
            <img src={logoUrl} alt={companyName} className="h-10 object-contain" />
        ) : (
        <>
            <div className="size-10 bg-primary flex items-center justify-center rounded-full shrink-0 shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-white">school</span>
            </div>
            <h2 className="text-lg font-extrabold tracking-tight truncate hidden md:block text-zinc-800">{companyName}</h2>
        </>
        )}
    </div>
  );
};
