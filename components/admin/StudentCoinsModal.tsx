import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Student } from '../../types';

type CoinsMode = 'set' | 'add' | 'remove';

export interface CoinsTransactionInfo {
  description: string;
  category: string;
  type: 'credit' | 'debit';
  amount: number;
}

interface StudentCoinsModalProps {
  student: Student;
  onClose: () => void;
  onSave: (updated: Student, txInfo: CoinsTransactionInfo) => void;
}

export const StudentCoinsModal: React.FC<StudentCoinsModalProps> = ({ student, onClose, onSave }) => {
  const [mode, setMode] = useState<CoinsMode>('add');
  const [amount, setAmount] = useState('');

  const parsed = Math.max(0, parseInt(amount) || 0);

  const newBalance = (() => {
    if (mode === 'set') return parsed;
    if (mode === 'add') return student.coins + parsed;
    return Math.max(0, student.coins - parsed);
  })();

  const diff = newBalance - student.coins;

  const handleSave = () => {
    const updated: Student = { ...student, coins: newBalance };

    const txInfo: CoinsTransactionInfo = {
      description:
        mode === 'set' ? 'Saldo Inicial Definido' :
        mode === 'add' ? 'Crédito Manual' :
        'Débito Manual',
      category: 'Ajuste Admin',
      type: mode === 'remove' ? 'debit' : 'credit',
      amount: mode === 'set' ? newBalance : parsed,
    };

    console.log(`Moedas atualizadas para ${student.name}:`, {
      modo: mode,
      valor: parsed,
      saldoAnterior: student.coins,
      novoSaldo: newBalance,
    });

    onSave(updated, txInfo);
    onClose();
  };

  const isValid = amount !== '' && parsed >= 0 && !(mode === 'remove' && parsed > student.coins);

  const modes: { key: CoinsMode; label: string; icon: string; color: string; activeBg: string; activeText: string }[] = [
    { key: 'set',    label: 'Saldo Inicial',  icon: 'tune',     color: 'text-zinc-500', activeBg: 'bg-zinc-800',  activeText: 'text-white' },
    { key: 'add',    label: 'Adicionar', icon: 'add_circle',   color: 'text-zinc-500', activeBg: 'bg-green-500', activeText: 'text-white' },
    { key: 'remove', label: 'Remover',   icon: 'remove_circle', color: 'text-zinc-500', activeBg: 'bg-red-500',   activeText: 'text-white' },
  ];

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-100 w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-black transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-5">
          <div className="flex items-center gap-4">
            <div className={`size-12 rounded-full flex items-center justify-center font-bold text-lg ${student.colorClass}`}>
              {student.initials}
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Gerenciar Moedas</h2>
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">{student.name}</p>
            </div>
          </div>
        </div>

        {/* Current balance */}
        <div className="mx-8 mb-5 flex items-center gap-3 bg-zinc-50 border border-zinc-100 rounded-2xl px-5 py-4">
          <div className="size-9 bg-yellow-400 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
            <span className="material-symbols-outlined text-sm text-black">monetization_on</span>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Saldo Atual</p>
            <p className="text-2xl font-black text-zinc-900 leading-none mt-0.5">{student.coins.toLocaleString()}</p>
          </div>
        </div>

        <div className="px-8 space-y-5 pb-5">
          {/* Mode selector */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1 mb-2">
              Operação
            </label>
            <div className="grid grid-cols-3 gap-2">
              {modes.map(m => (
                <button
                  key={m.key}
                  onClick={() => { setMode(m.key); setAmount(''); }}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl border-2 text-xs font-bold transition-all ${
                    mode === m.key
                      ? `${m.activeBg} ${m.activeText} border-transparent`
                      : 'border-zinc-100 text-zinc-500 hover:border-zinc-200 hover:bg-zinc-50'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{m.icon}</span>
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mode description */}
          {mode === 'set' && (
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
              <span className="material-symbols-outlined text-[18px] text-amber-500 flex-shrink-0 mt-0.5">info</span>
              <p className="text-xs text-amber-700 font-medium leading-snug">
                Define o saldo do zero, substituindo o valor atual. Use para configurar o saldo inicial do aluno.
              </p>
            </div>
          )}

          {/* Amount input */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1 mb-2">
              {mode === 'set' ? 'Definir saldo inicial' : mode === 'add' ? 'Quantidade a adicionar' : 'Quantidade a remover'}
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-lg">
                monetization_on
              </span>
              <input
                type="number"
                min="0"
                max={mode === 'remove' ? student.coins : undefined}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-zinc-200 rounded-full text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-zinc-400"
                autoFocus
              />
            </div>
            {mode === 'remove' && parsed > student.coins && (
              <p className="text-xs text-red-500 ml-3 mt-1.5">Valor maior que o saldo atual</p>
            )}
          </div>

          {/* Preview */}
          {amount !== '' && isValid && (
            <div className={`rounded-2xl px-5 py-4 border ${
              mode === 'add' ? 'bg-green-50 border-green-100' :
              mode === 'remove' ? 'bg-red-50 border-red-100' :
              'bg-zinc-50 border-zinc-100'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${
                    mode === 'add' ? 'text-green-600' : mode === 'remove' ? 'text-red-500' : 'text-zinc-400'
                  }`}>
                    Novo Saldo
                  </p>
                  <p className="text-2xl font-black text-zinc-900 leading-none mt-0.5">
                    {newBalance.toLocaleString()}
                  </p>
                </div>
                {mode !== 'set' && (
                  <div className={`flex items-center gap-1 text-sm font-bold ${diff >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="material-symbols-outlined text-[18px]">
                      {diff >= 0 ? 'trending_up' : 'trending_down'}
                    </span>
                    {diff >= 0 ? '+' : ''}{diff.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="px-8 pb-8 flex gap-3">
          <Button variant="outline" fullWidth onClick={onClose}>Cancelar</Button>
          <Button
            fullWidth
            onClick={handleSave}
            disabled={!isValid}
            className={!isValid ? 'opacity-40 cursor-not-allowed' : ''}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
};
