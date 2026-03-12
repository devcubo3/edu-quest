import React, { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { ProfileDetails } from '../../components/dashboard/ProfileDetails';
import { ChangePasswordModal } from '../../components/dashboard/ChangePasswordModal';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const StudentProfile: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
        setIsChangePasswordOpen(false);
        alert('Senha alterada com sucesso!');
    }, 500);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 bg-background-light">
         <div className="max-w-xl mx-auto w-full">
            
            <PageHeader 
              title="Minha Conta" 
              subtitle="Portal do Aluno" 
              action={
                <Button variant="secondary" size="sm" icon="arrow_back" onClick={() => navigate('/student/dashboard')}>
                    Voltar
                </Button>
              }
            />

            <ProfileDetails 
              onOpenChangePassword={() => setIsChangePasswordOpen(true)}
              onLogout={handleLogout}
            />
            
            <p className="text-center text-[10px] font-bold text-zinc-400 mt-8 uppercase tracking-widest">
                Dúvidas? Entre em contato com a secretaria.
            </p>
         </div>

         <ChangePasswordModal 
            isOpen={isChangePasswordOpen}
            onClose={() => setIsChangePasswordOpen(false)}
            onSubmit={handleChangePassword}
         />
      </main>
    </div>
  );
};