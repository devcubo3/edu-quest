import React from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Student } from '../../types';

interface StudentTableProps {
  students: Student[];
  onManage: (student: Student) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({ students, onManage }) => {
  return (
    <Card noPadding className="border-zinc-200">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-100">
            <tr>
              <th className="px-8 py-5 font-bold uppercase text-[10px] tracking-widest text-zinc-500">Nome do Aluno</th>
              <th className="px-8 py-5 font-bold uppercase text-[10px] tracking-widest text-zinc-500">ID</th>
              <th className="px-8 py-5 font-bold uppercase text-[10px] tracking-widest text-zinc-500">Turma</th>
              <th className="px-8 py-5 font-bold uppercase text-[10px] tracking-widest text-zinc-500">Moedas</th>
              <th className="px-8 py-5 font-bold uppercase text-[10px] tracking-widest text-zinc-500 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {students.map((student) => (
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full"
                    onClick={() => onManage(student)}
                  >
                    Gerenciar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
