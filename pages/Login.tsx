import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { LoginHero } from '../components/auth/LoginHero';
import { LoginForm } from '../components/auth/LoginForm';

export const Login: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      login(role);
      navigate(role === UserRole.ADMIN ? '/admin/dashboard' : '/student/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-background-light">
      <LoginHero />

      {/* Right Side: Auth Form */}
      <div className="flex w-full flex-col bg-white lg:w-[40%]">
        <header className="flex items-center justify-between p-8 lg:px-12 lg:pt-10">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
               <span className="material-symbols-outlined text-white text-lg">school</span>
            </div>
            <span className="text-xl font-bold tracking-tight">EduQuest</span>
          </div>
        </header>

        <main className="flex flex-1 flex-col justify-center px-8 pb-12 lg:px-16 lg:pb-24">
          <LoginForm 
            role={role}
            setRole={setRole}
            isLoading={isLoading}
            onSubmit={handleLogin}
          />
        </main>
      </div>
    </div>
  );
};