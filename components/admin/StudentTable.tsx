import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Card } from '../ui/Card';
import { Student } from '../../types';

type SortKey = 'name' | 'studentId' | 'class' | 'coins';
type SortDir = 'asc' | 'desc';

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
  onManageCoins: (student: Student) => void;
}

const SortIcon: React.FC<{ column: SortKey; sortKey: SortKey | null; sortDir: SortDir }> = ({ column, sortKey, sortDir }) => {
  if (sortKey !== column) {
    return (
      <span className="material-symbols-outlined text-[14px] text-zinc-300 group-hover:text-zinc-400 transition-colors ml-1">
        unfold_more
      </span>
    );
  }
  return (
    <span className="material-symbols-outlined text-[14px] ml-1" style={{ color: 'var(--color-primary)' }}>
      {sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward'}
    </span>
  );
};

export const StudentTable: React.FC<StudentTableProps> = ({ students, onEdit, onDelete, onManageCoins }) => {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sorted = useMemo(() => {
    if (!sortKey) return students;
    return [...students].sort((a, b) => {
      let aVal: string | number = a[sortKey];
      let bVal: string | number = b[sortKey];
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [students, sortKey, sortDir]);

  const thClass = "px-8 py-5 font-bold uppercase text-[10px] tracking-widest text-zinc-500 select-none cursor-pointer group hover:text-zinc-800 transition-colors";

  const toggleDropdown = (studentId: string) => {
    setOpenDropdown(prev => (prev === studentId ? null : studentId));
  };

  return (
    <Card noPadding className="border-zinc-200">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-100">
            <tr>
              <th className={thClass} onClick={() => handleSort('name')}>
                <span className="inline-flex items-center">
                  Nome do Aluno
                  <SortIcon column="name" sortKey={sortKey} sortDir={sortDir} />
                </span>
              </th>
              <th className={thClass} onClick={() => handleSort('studentId')}>
                <span className="inline-flex items-center">
                  ID
                  <SortIcon column="studentId" sortKey={sortKey} sortDir={sortDir} />
                </span>
              </th>
              <th className={thClass} onClick={() => handleSort('class')}>
                <span className="inline-flex items-center">
                  Turma
                  <SortIcon column="class" sortKey={sortKey} sortDir={sortDir} />
                </span>
              </th>
              <th className={thClass} onClick={() => handleSort('coins')}>
                <span className="inline-flex items-center">
                  Moedas
                  <SortIcon column="coins" sortKey={sortKey} sortDir={sortDir} />
                </span>
              </th>
              <th className="px-8 py-5 font-bold uppercase text-[10px] tracking-widest text-zinc-500 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {sorted.map((student) => (
              <tr key={student.id} className="group hover:bg-zinc-50 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className={`size-8 rounded-full flex items-center justify-center font-bold text-xs ${student.colorClass}`}>
                      {student.initials}
                    </div>
                    <span className="font-bold">{student.name}</span>
                  </div>
                </td>
                <td className="px-8 py-5 font-mono text-zinc-500">{student.studentId}</td>
                <td className="px-8 py-5">
                  <span className="bg-zinc-100 px-3 py-1 rounded-full text-xs font-bold">{student.class}</span>
                </td>
                <td className="px-8 py-5 font-bold">{student.coins.toLocaleString()}</td>
                <td className="px-8 py-5 text-right">
                  <div
                    className="relative inline-block"
                    ref={openDropdown === student.id ? dropdownRef : undefined}
                  >
                    <button
                      onClick={() => toggleDropdown(student.id)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-2 rounded-full transition-all ${
                        openDropdown === student.id
                          ? 'border-primary bg-primary text-white'
                          : 'border-primary text-primary hover:bg-primary hover:text-white'
                      }`}
                    >
                      Gerenciar
                      <span className={`material-symbols-outlined text-[14px] transition-transform duration-200 ${openDropdown === student.id ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>

                    {openDropdown === student.id && (
                      <div className="absolute right-0 top-10 w-48 bg-white rounded-2xl shadow-xl border border-zinc-100 overflow-hidden z-20">
                        <div className="py-1">
                          <button
                            onClick={() => { onEdit(student); setOpenDropdown(null); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors font-medium"
                          >
                            <span className="material-symbols-outlined text-[18px] text-zinc-400">manage_accounts</span>
                            Editar Perfil
                          </button>
                          <button
                            onClick={() => { onManageCoins(student); setOpenDropdown(null); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors font-medium"
                          >
                            <span className="material-symbols-outlined text-[18px] text-amber-500">monetization_on</span>
                            Gerenciar Moedas
                          </button>
                          <div className="my-1 border-t border-zinc-100" />
                          <button
                            onClick={() => { onDelete(student); setOpenDropdown(null); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium"
                          >
                            <span className="material-symbols-outlined text-[18px] text-red-400">delete</span>
                            Excluir
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
