import React from 'react';

interface ClassData {
  id: string;
  name: string;
  department: string;
  room: string;
  studentsCount: number;
  schedule: string;
}

interface ClassCardProps {
  cls: ClassData;
  isFirst?: boolean;
}

export const ClassCard: React.FC<ClassCardProps> = ({ cls, isFirst }) => {
  return (
    <div className="group relative bg-white border border-zinc-200 hover:border-black rounded-[16px] p-6 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
      {isFirst && <div className="absolute top-4 right-4 size-3 bg-green-500 rounded-full border-2 border-white"></div>}
      
      <div className="mb-6">
          <h3 className="text-xl font-bold mb-1">{cls.name}</h3>
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">{cls.department} • {cls.room}</p>
      </div>
      
      <div className="flex items-center justify-between">
          <div className="flex -space-x-3">
            <div className="size-8 rounded-full bg-zinc-300 border-2 border-white"></div>
            <div className="size-8 rounded-full bg-zinc-400 border-2 border-white"></div>
            <div className="size-8 rounded-full bg-zinc-500 border-2 border-white"></div>
          </div>
          <span className="text-sm font-bold text-zinc-500 group-hover:text-black transition-colors">{cls.studentsCount} Alunos</span>
      </div>
      
      <div className="mt-4 pt-4 border-t border-zinc-100">
          <span className="text-xs font-bold bg-zinc-100 px-3 py-1 rounded-full text-zinc-500">{cls.schedule}</span>
      </div>
    </div>
  );
};
