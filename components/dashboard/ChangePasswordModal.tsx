import React from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl relative">
            <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-zinc-400 hover:text-black transition-colors"
            >
                <span className="material-symbols-outlined">close</span>
            </button>
            
            <div className="mb-6 text-center">
                <div className="size-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4 text-black">
                    <span className="material-symbols-outlined">lock_reset</span>
                </div>
                <h3 className="text-xl font-black tracking-tight">Alterar Senha</h3>
                <p className="text-sm text-zinc-500 mt-1">Sua nova senha deve ser diferente da anterior.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                <Input label="Senha Atual" type="password" placeholder="••••••••" required />
                <Input label="Nova Senha" type="password" placeholder="••••••••" required />
                <Input label="Confirmar Nova Senha" type="password" placeholder="••••••••" required />
                
                <div className="pt-4">
                    <Button fullWidth type="submit">Atualizar Senha</Button>
                </div>
            </form>
        </div>
    </div>
  );
};
