import React from 'react';
import { Card } from '../ui/Card';

interface Transaction {
  id: string;
  timestamp: string;
  studentInitials: string;
  studentName: string;
  studentClass: string;
  description: string;
  category: string;
  type: 'credit' | 'debit';
  amount: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  return (
    <Card noPadding className="border-zinc-200">
      <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
                <tr className="bg-zinc-50 border-b border-zinc-100">
                  <th className="py-5 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Data/Hora</th>
                  <th className="py-5 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Aluno</th>
                  <th className="py-5 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Turma</th>
                  <th className="py-5 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Descrição / Razão</th>
                  <th className="py-5 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 text-right">Valor</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="group hover:bg-zinc-50 transition-colors">
                      <td className="py-5 px-8 text-sm font-medium text-zinc-500 whitespace-nowrap">{tx.timestamp}</td>
                      <td className="py-5 px-8">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] font-bold">{tx.studentInitials}</div>
                            <span className="text-sm font-bold">{tx.studentName}</span>
                        </div>
                      </td>
                      <td className="py-5 px-8 text-sm font-medium text-zinc-500">{tx.studentClass}</td>
                      <td className="py-5 px-8">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold">{tx.description}</span>
                            <span className="text-xs text-zinc-400">{tx.category}</span>
                        </div>
                      </td>
                      <td className="py-5 px-8 text-right">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${tx.type === 'credit' ? 'bg-zinc-100 text-black border-zinc-200' : 'bg-white text-zinc-500 border-zinc-200'}`}>
                            <span className="material-symbols-outlined text-[14px]">{tx.type === 'credit' ? 'add' : 'remove'}</span> {tx.amount}
                        </span>
                      </td>
                  </tr>
                ))}
            </tbody>
          </table>
      </div>
      <div className="border-t border-zinc-100 p-6 flex items-center justify-between">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Exibindo 1-6 de 1,024</p>
          <div className="flex gap-2">
            <button className="size-8 flex items-center justify-center rounded-full border border-zinc-200 hover:bg-black hover:text-white transition-colors disabled:opacity-50">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="size-8 flex items-center justify-center rounded-full border border-zinc-200 hover:bg-black hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
      </div>
    </Card>
  );
};
