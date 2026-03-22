import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Student } from '../../types';

const COLOR_CLASSES = [
  'bg-blue-100 text-blue-600',
  'bg-purple-100 text-purple-600',
  'bg-green-100 text-green-600',
  'bg-amber-100 text-amber-600',
  'bg-pink-100 text-pink-600',
  'bg-red-100 text-red-600',
  'bg-indigo-100 text-indigo-600',
  'bg-teal-100 text-teal-600',
];

function getInitials(name: string): string {
  return name
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
}

function generateStudentId(): string {
  const year = new Date().getFullYear();
  const num = String(Math.floor(Math.random() * 900) + 100);
  return `#STU-${year}-${num}`;
}

interface StudentCreateModalProps {
  onClose: () => void;
  onCreate: (student: Student) => void;
}

export const StudentCreateModal: React.FC<StudentCreateModalProps> = ({ onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [coins, setCoins] = useState('0');
  const [errors, setErrors] = useState<{ name?: string; class?: string }>({});

  const validate = () => {
    const e: { name?: string; class?: string } = {};
    if (!name.trim()) e.name = 'Nome é obrigatório';
    if (!studentClass.trim()) e.class = 'Turma é obrigatória';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCreate = () => {
    if (!validate()) return;

    const newStudent: Student = {
      id: `stu-${Date.now()}`,
      studentId: generateStudentId(),
      name: name.trim(),
      class: studentClass.trim(),
      coins: Math.max(0, parseInt(coins) || 0),
      avatar: '',
      initials: getInitials(name),
      colorClass: COLOR_CLASSES[Math.floor(Math.random() * COLOR_CLASSES.length)],
    };

    console.log('Novo aluno criado:', newStudent);
    onCreate(newStudent);
    onClose();
  };

  const initials = getInitials(name) || '?';

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
            <div className="size-12 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-lg text-zinc-500 transition-all">
              {initials}
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Novo Aluno</h2>
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">Preencha os dados abaixo</p>
            </div>
          </div>
        </div>

        <div className="px-8 py-4 space-y-4">
          <Input
            label="Nome Completo"
            icon="person"
            placeholder="Ex: João Silva"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
          />

          <Input
            label="Turma"
            icon="school"
            placeholder="Ex: 4B"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            error={errors.class}
          />

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-3 mb-2">
              Moedas Iniciais
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-lg">
                monetization_on
              </span>
              <input
                type="number"
                min="0"
                value={coins}
                onChange={(e) => setCoins(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-zinc-200 rounded-full text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <div className="p-8 pt-4 flex gap-3">
          <Button variant="outline" fullWidth onClick={onClose}>Cancelar</Button>
          <Button fullWidth onClick={handleCreate} icon="person_add">Criar Aluno</Button>
        </div>
      </div>
    </div>
  );
};
