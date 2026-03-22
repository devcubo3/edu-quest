import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Student } from '../../types';

function getInitials(name: string): string {
  return name
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
}

interface StudentEditModalProps {
  student: Student;
  onClose: () => void;
  onSave: (updated: Student) => void;
}

export const StudentEditModal: React.FC<StudentEditModalProps> = ({ student, onClose, onSave }) => {
  const [name, setName] = useState(student.name);
  const [studentClass, setStudentClass] = useState(student.class);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const generatePassword = () => {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#';
    const newPass = Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    setPassword(newPass);
    setShowPassword(true);
  };

  const handleSave = () => {
    const updated: Student = {
      ...student,
      name: name.trim() || student.name,
      class: studentClass.trim() || student.class,
      initials: getInitials(name.trim() || student.name),
    };

    console.log('Aluno atualizado:', updated);
    if (password) console.log('Nova senha definida para', updated.name, ':', password);

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-100 w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-black transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="px-8 pt-8 pb-4">
          <div className="flex items-center gap-4 mb-2">
            <div className={`size-12 rounded-full flex items-center justify-center font-bold text-lg ${student.colorClass}`}>
              {getInitials(name) || student.initials}
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Editar Aluno</h2>
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">ID: {student.studentId}</p>
            </div>
          </div>
        </div>

        <div className="px-8 py-4 space-y-5">
          <Input
            label="Nome Completo"
            icon="person"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="Turma"
            icon="school"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
          />

          {/* Password Reset */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-3">
                Resetar Senha
              </label>
              <button
                onClick={generatePassword}
                className="text-[10px] font-bold text-blue-600 uppercase tracking-wide hover:underline"
              >
                Gerar Aleatória
              </button>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-lg">lock</span>
              <input
                className="w-full pl-11 pr-12 py-3.5 bg-white border border-zinc-200 rounded-full text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-zinc-400"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nova senha (opcional)"
              />
              <button
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 pt-4 flex gap-3">
          <Button variant="outline" fullWidth onClick={onClose}>Cancelar</Button>
          <Button fullWidth onClick={handleSave}>Salvar Mudanças</Button>
        </div>
      </div>
    </div>
  );
};
