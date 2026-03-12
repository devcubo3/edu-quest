import React from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Student } from '../../types';

interface StudentEditModalProps {
  student: Student;
  onClose: () => void;
}

export const StudentEditModal: React.FC<StudentEditModalProps> = ({ student, onClose }) => {
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
                {student.initials}
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight">Editar Aluno</h2>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">ID: {student.studentId}</p>
              </div>
            </div>
          </div>

          <div className="px-8 py-4 space-y-6">
              <Input label="Nome Completo" icon="person" defaultValue={student.name} />
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-3">Resetar Senha</label>
                  <button className="text-[10px] font-bold text-blue-600 uppercase tracking-wide hover:underline">Gerar Aleatória</button>
                </div>
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-lg">lock</span>
                    <input 
                      className="w-full pl-11 pr-12 py-3 bg-zinc-50 border border-zinc-200 rounded-full text-sm font-bold focus:ring-2 focus:ring-black outline-none"
                      type="password"
                      defaultValue="••••••••"
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black">
                      <span className="material-symbols-outlined text-lg">visibility_off</span>
                    </button>
                </div>
              </div>

              <hr className="border-dashed border-zinc-200 my-4"/>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3 block ml-3">Saldo de Moedas</label>
                <div className="flex items-center justify-between bg-zinc-50 border border-zinc-100 rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 bg-yellow-400 rounded-full flex items-center justify-center text-black shadow-sm">
                          <span className="material-symbols-outlined text-sm font-bold">monetization_on</span>
                      </div>
                      <div>
                          <span className="block text-xl font-black">{student.coins}</span>
                          <span className="text-[10px] font-bold text-zinc-400 uppercase">Saldo Atual</span>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" className="bg-white">
                      Ajustar
                      <span className="material-symbols-outlined text-sm ml-1">unfold_more</span>
                    </Button>
                </div>
              </div>
          </div>

          <div className="p-8 pt-4 flex gap-3">
              <Button variant="outline" fullWidth onClick={onClose}>Cancelar</Button>
              <Button fullWidth onClick={onClose}>Salvar Mudanças</Button>
          </div>
      </div>
    </div>
  );
};
