import React from 'react';
import { Button } from '../ui/Button';
import { MOCK_STUDENT_USER } from '../../constants';

interface ProfileDetailsProps {
  onOpenChangePassword: () => void;
  onLogout: () => void;
}

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({ onOpenChangePassword, onLogout }) => {
  return (
    <div className="bg-white rounded-[24px] border border-zinc-100 shadow-sm p-8 lg:p-10 flex flex-col items-center">
        {/* Photo Upload Section */}
        <div className="relative group mb-8">
            <div className="size-32 rounded-full border-4 border-zinc-50 p-1 bg-white shadow-sm">
                <div className="w-full h-full rounded-full overflow-hidden bg-zinc-50 relative">
                    <img src={MOCK_STUDENT_USER.avatar} alt="Profile" className="w-full h-full object-cover" />
                      {/* Overlay when hovering */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                          <span className="material-symbols-outlined text-white">edit</span>
                      </div>
                </div>
            </div>
            <button className="absolute bottom-1 right-1 size-9 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-sm">photo_camera</span>
            </button>
        </div>

        {/* Read Only Fields */}
        <div className="w-full space-y-6 mb-8">
            <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-3">Nome Completo</label>
                <div className="w-full bg-zinc-50 border border-zinc-200 rounded-full px-6 py-3.5 text-sm font-bold text-zinc-500 cursor-not-allowed flex items-center gap-3">
                    <span className="material-symbols-outlined text-zinc-300">person</span>
                    {MOCK_STUDENT_USER.name}
                    <span className="ml-auto text-[10px] bg-zinc-200 text-zinc-500 px-2 py-0.5 rounded-full uppercase">Fixo</span>
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-3">Usuário / E-mail</label>
                  <div className="w-full bg-zinc-50 border border-zinc-200 rounded-full px-6 py-3.5 text-sm font-bold text-zinc-500 cursor-not-allowed flex items-center gap-3">
                    <span className="material-symbols-outlined text-zinc-300">mail</span>
                    {MOCK_STUDENT_USER.email}
                    <span className="ml-auto text-[10px] bg-zinc-200 text-zinc-500 px-2 py-0.5 rounded-full uppercase">Fixo</span>
                </div>
            </div>
        </div>

        {/* Actions */}
        <div className="w-full space-y-4 pt-4 border-t border-zinc-100">
            <Button 
                variant="secondary" 
                fullWidth 
                icon="lock" 
                onClick={onOpenChangePassword}
                className="bg-white border border-zinc-200 hover:border-black hover:bg-zinc-50"
            >
                Alterar Senha
            </Button>
            
            <button 
                onClick={onLogout}
                className="w-full py-3 flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 rounded-full transition-colors font-bold text-sm"
            >
                <span className="material-symbols-outlined">logout</span>
                Sair da Conta
            </button>
        </div>
    </div>
  );
};
