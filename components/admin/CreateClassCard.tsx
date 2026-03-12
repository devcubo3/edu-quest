import React from 'react';

interface CreateClassCardProps {
  onClick?: () => void;
}

export const CreateClassCard: React.FC<CreateClassCardProps> = ({ onClick }) => {
  return (
    <div 
        onClick={onClick}
        className="group border-2 border-dashed border-zinc-300 rounded-[16px] p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-zinc-50 transition-colors min-h-[200px]"
    >
        <div className="size-12 bg-zinc-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-zinc-400">add</span>
        </div>
        <span className="text-sm font-bold text-zinc-500">Criar Nova Turma</span>
    </div>
  );
};
