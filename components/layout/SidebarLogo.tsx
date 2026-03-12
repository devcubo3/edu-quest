import React from 'react';

interface SidebarLogoProps {
  logoUrl: string | null;
  companyName: string;
}

export const SidebarLogo: React.FC<SidebarLogoProps> = ({ logoUrl, companyName }) => {
  return (
    <div className="flex items-center gap-3 mb-12 px-2 h-10">
        {logoUrl ? (
            <img src={logoUrl} alt={companyName} className="h-full object-contain" />
        ) : (
        <>
            <div className="size-10 bg-primary flex items-center justify-center rounded-full shrink-0 shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-white">school</span>
            </div>
            <h2 className="text-lg font-extrabold tracking-tight truncate">{companyName}</h2>
        </>
        )}
    </div>
  );
};
