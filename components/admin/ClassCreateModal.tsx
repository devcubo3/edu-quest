import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ClassItem } from '../../types';

const COLOR_OPTIONS = [
  { value: 'bg-blue-500',   hex: '#3b82f6' },
  { value: 'bg-green-500',  hex: '#22c55e' },
  { value: 'bg-purple-500', hex: '#a855f7' },
  { value: 'bg-amber-500',  hex: '#f59e0b' },
  { value: 'bg-pink-500',   hex: '#ec4899' },
  { value: 'bg-red-500',    hex: '#ef4444' },
  { value: 'bg-indigo-500', hex: '#6366f1' },
  { value: 'bg-teal-500',   hex: '#14b8a6' },
];

const SCHEDULE_OPTIONS = ['Manhã', 'Tarde', 'Noite'];

interface ClassCreateModalProps {
  onClose: () => void;
  onCreate: (cls: ClassItem) => void;
}

export const ClassCreateModal: React.FC<ClassCreateModalProps> = ({ onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [room, setRoom] = useState('');
  const [schedule, setSchedule] = useState(SCHEDULE_OPTIONS[0]);
  const [color, setColor] = useState(COLOR_OPTIONS[0].value);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Nome é obrigatório';
    if (!department.trim()) e.department = 'Departamento é obrigatório';
    if (!room.trim()) e.room = 'Sala é obrigatória';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCreate = () => {
    if (!validate()) return;

    const newClass: ClassItem = {
      id: `cls-${Date.now()}`,
      name: name.trim(),
      department: department.trim(),
      room: room.trim(),
      schedule,
      color,
      studentsCount: 0,
    };

    console.log('Nova turma criada:', newClass);
    onCreate(newClass);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-100 w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-400 hover:text-black transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-5">
          <div className="flex items-center gap-4">
            <div className={`size-12 rounded-2xl flex items-center justify-center ${color}`}>
              <span className="material-symbols-outlined text-white text-[22px]">school</span>
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Nova Turma</h2>
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">Preencha os dados abaixo</p>
            </div>
          </div>
        </div>

        <div className="px-8 pb-5 space-y-4">
          <Input
            label="Nome da Turma"
            icon="school"
            placeholder="Ex: Advanced Physics"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
          />

          <Input
            label="Departamento"
            icon="domain"
            placeholder="Ex: Science Dept"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            error={errors.department}
          />

          <Input
            label="Sala"
            icon="meeting_room"
            placeholder="Ex: Room 302"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            error={errors.room}
          />

          {/* Schedule */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-3 mb-2">
              Horário
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-lg pointer-events-none">schedule</span>
              <select
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 bg-white border border-zinc-200 rounded-full text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none"
              >
                {SCHEDULE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none text-lg">expand_more</span>
            </div>
          </div>

          {/* Color picker */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-3 mb-2">
              Cor de identificação
            </label>
            <div className="flex gap-2 flex-wrap">
              {COLOR_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setColor(opt.value)}
                  className={`size-9 rounded-full transition-all border-2 ${opt.value} ${
                    color === opt.value ? 'border-zinc-900 scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                  }`}
                >
                  {color === opt.value && (
                    <span className="material-symbols-outlined text-white text-[16px]">check</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-8 pb-8 flex gap-3">
          <Button variant="outline" fullWidth onClick={onClose}>Cancelar</Button>
          <Button fullWidth onClick={handleCreate} icon="add">Criar Turma</Button>
        </div>
      </div>
    </div>
  );
};
