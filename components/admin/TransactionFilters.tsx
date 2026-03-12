import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const TransactionFilters: React.FC = () => {
  return (
    <Card className="bg-zinc-50 mb-8 border-zinc-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 pl-2">Nome do Aluno</label>
            <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-[20px]">search</span>
                <input className="w-full bg-white border border-zinc-200 rounded-full pl-11 pr-4 py-2.5 text-sm font-medium focus:ring-0 focus:border-black transition-colors placeholder:text-zinc-300" placeholder="Buscar aluno..." type="text"/>
            </div>
          </div>
          {['Turma', 'Intervalo de Datas', 'Tipo de Transação'].map((label, i) => (
            <div key={i} className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 pl-2">{label}</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-white border border-zinc-200 rounded-full pl-4 pr-10 py-2.5 text-sm font-medium focus:ring-0 focus:border-black transition-colors">
                      <option>Todos</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 text-[20px] pointer-events-none">expand_more</span>
                </div>
            </div>
          ))}
      </div>
      <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-zinc-200">
          <button className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-black px-4 py-2 transition-colors">Limpar</button>
          <Button size="sm">Aplicar Filtros</Button>
      </div>
    </Card>
  );
};
