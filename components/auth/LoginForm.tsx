import React from 'react';
import { UserRole } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface LoginFormProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ role, setRole, isLoading, onSubmit }) => {
  return (
    <div className="mx-auto w-full max-w-[420px]">
        <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight mb-3">Bem-vindo de volta</h1>
            <p className="text-zinc-500">Continue sua jornada educacional de onde parou.</p>
        </div>

        {/* Role Switcher */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100 rounded-full mb-8">
            <button 
                type="button"
                onClick={() => setRole(UserRole.STUDENT)}
                className={`py-2 text-sm font-bold rounded-full transition-all ${role === UserRole.STUDENT ? 'bg-white shadow-sm text-primary' : 'text-zinc-400 hover:text-black'}`}
            >
                Aluno
            </button>
            <button 
                type="button"
                onClick={() => setRole(UserRole.ADMIN)}
                className={`py-2 text-sm font-bold rounded-full transition-all ${role === UserRole.ADMIN ? 'bg-white shadow-sm text-primary' : 'text-zinc-400 hover:text-black'}`}
            >
                Administrador
            </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
            <Input 
                label="E-mail" 
                icon="mail" 
                placeholder={role === UserRole.ADMIN ? "admin@edu.quest" : "aluno@edu.quest"}
                defaultValue={role === UserRole.ADMIN ? "admin@edu.quest" : "student@edu.quest"}
                type="email"
                required
            />
            <div className="space-y-1">
                <Input 
                    label="Senha" 
                    icon="lock" 
                    placeholder="••••••••" 
                    type="password"
                    required
                />
                <div className="flex justify-end">
                    <a href="#" className="text-[10px] font-bold text-zinc-400 hover:text-primary uppercase tracking-wider">Esqueceu?</a>
                </div>
            </div>

            <Button 
                type="submit" 
                fullWidth 
                size="lg"
                isLoading={isLoading}
            >
                Entrar como {role === UserRole.ADMIN ? 'Admin' : 'Aluno'}
            </Button>
        </form>

        <div className="mt-12 text-center">
            <p className="text-xs text-zinc-400">
                Não tem uma conta? <span className="font-bold text-primary cursor-pointer hover:underline">Contate a Secretaria</span>
            </p>
        </div>
    </div>
  );
};
