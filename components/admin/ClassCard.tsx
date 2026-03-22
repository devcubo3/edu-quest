import React from 'react';
import { ClassItem } from '../../types';
import { useStudents } from '../../context/StudentsContext';

interface ClassCardProps {
  cls: ClassItem;
  isFirst?: boolean;
  onClick?: () => void;
}

export const ClassCard: React.FC<ClassCardProps> = ({ cls, isFirst, onClick }) => {
  const { students } = useStudents();
  const enrolled = students.filter(s => s.class.toLowerCase() === cls.name.toLowerCase());
  const count = enrolled.length;
  const preview = enrolled.slice(0, 3);

  return (
    <div
      onClick={onClick}
      className="group relative bg-white border border-zinc-200 hover:border-black rounded-[16px] p-6 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Color accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-[16px] ${cls.color}`} />

      {isFirst && (
        <div className="absolute top-4 right-4 size-3 bg-green-500 rounded-full border-2 border-white" />
      )}

      <div className="mb-6 mt-1">
        <h3 className="text-xl font-bold mb-1">{cls.name}</h3>
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">{cls.department} • {cls.room}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex -space-x-3">
          {count === 0 ? (
            <>
              <div className="size-8 rounded-full bg-zinc-200 border-2 border-white" />
              <div className="size-8 rounded-full bg-zinc-200 border-2 border-white" />
              <div className="size-8 rounded-full bg-zinc-200 border-2 border-white" />
            </>
          ) : (
            <>
              {preview.map(s => (
                <div
                  key={s.id}
                  className={`size-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold ${s.colorClass}`}
                  title={s.name}
                >
                  {s.initials}
                </div>
              ))}
              {count > 3 && (
                <div className="size-8 rounded-full border-2 border-white bg-zinc-100 flex items-center justify-center text-[9px] font-bold text-zinc-500">
                  +{count - 3}
                </div>
              )}
            </>
          )}
        </div>
        <span className="text-sm font-bold text-zinc-500 group-hover:text-black transition-colors">
          {count} {count === 1 ? 'Aluno' : 'Alunos'}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between">
        <span className="text-xs font-bold bg-zinc-100 px-3 py-1 rounded-full text-zinc-500">{cls.schedule}</span>
        <span className="material-symbols-outlined text-[16px] text-zinc-300 group-hover:text-zinc-600 group-hover:translate-x-0.5 transition-all">
          arrow_forward
        </span>
      </div>
    </div>
  );
};
