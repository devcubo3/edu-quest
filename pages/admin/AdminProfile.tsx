import React, { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';

export const AdminProfile: React.FC = () => {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const initials = name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return;
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const passwordMismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;

  return (
    <div className="h-full flex flex-col bg-white">
      <Header />

      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <div className="max-w-2xl mx-auto w-full space-y-8 pb-12">

          <PageHeader
            title="Meu Perfil"
            subtitle="Configurações da Conta"
          />

          {/* Avatar + identity */}
          <Card>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">Informações Pessoais</p>

            {/* Avatar row */}
            <div className="flex items-center gap-5 mb-8">
              <div
                className="size-20 rounded-full flex items-center justify-center text-2xl font-black text-white flex-shrink-0"
                style={{ background: 'var(--color-primary)' }}
              >
                {initials || '?'}
              </div>
              <div>
                <p className="font-bold text-zinc-800">{name || '—'}</p>
                <p className="text-xs text-zinc-400 mt-0.5 uppercase tracking-widest font-semibold">Administrador</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 pl-1">Nome Completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-black transition-colors"
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 pl-1">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-black transition-colors"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-sm font-bold text-white transition-colors"
                  style={{ background: 'var(--color-primary)' }}
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </Card>

          {/* Password change */}
          <Card>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">Alterar Senha</p>

            <form onSubmit={handleSavePassword} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 pl-1">Senha Atual</label>
                <div className="relative">
                  <input
                    type={showCurrent ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-3 pr-12 text-sm font-medium focus:outline-none focus:border-black transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(p => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showCurrent ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 pl-1">Nova Senha</label>
                <div className="relative">
                  <input
                    type={showNew ? 'text' : 'password'}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-3 pr-12 text-sm font-medium focus:outline-none focus:border-black transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(p => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showNew ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 pl-1">Confirmar Nova Senha</label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className={`w-full bg-zinc-50 border rounded-2xl px-4 py-3 pr-12 text-sm font-medium focus:outline-none transition-colors ${
                      passwordMismatch ? 'border-red-300 focus:border-red-400' : 'border-zinc-200 focus:border-black'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(p => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showConfirm ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                {passwordMismatch && (
                  <p className="text-xs text-red-500 pl-1">As senhas não coincidem</p>
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={!currentPassword || !newPassword || passwordMismatch}
                  className="px-6 py-2.5 rounded-full text-sm font-bold text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: 'var(--color-primary)' }}
                >
                  Atualizar Senha
                </button>
              </div>
            </form>
          </Card>

          {/* Success toast */}
          {saved && (
            <div className="fixed bottom-6 right-6 flex items-center gap-3 bg-zinc-900 text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-xl z-50">
              <span className="material-symbols-outlined text-green-400 text-[20px]">check_circle</span>
              Alterações salvas com sucesso
            </div>
          )}

        </div>
      </main>
    </div>
  );
};
