import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

const PERIOD_OPTIONS = [
  { value: '', label: 'Todos os períodos' },
  { value: '1', label: 'Hoje' },
  { value: '7', label: 'Últimos 7 dias' },
  { value: '30', label: 'Últimos 30 dias' },
  { value: '90', label: 'Últimos 3 meses' },
];

const TYPE_OPTIONS = [
  { value: '', label: 'Todos os tipos' },
  { value: 'credit', label: 'Entrada' },
  { value: 'debit', label: 'Saída' },
];

interface TransactionFiltersProps {
  nameSearch: string;
  onNameSearch: (v: string) => void;
  classFilter: string;
  onClassFilter: (v: string) => void;
  periodFilter: string;
  onPeriodFilter: (v: string) => void;
  typeFilter: string;
  onTypeFilter: (v: string) => void;
  classes: string[];
  onClear: () => void;
}

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  nameSearch, onNameSearch,
  classFilter, onClassFilter,
  periodFilter, onPeriodFilter,
  typeFilter, onTypeFilter,
  classes,
  onClear,
}) => {
  const hasFilters = !!(nameSearch || classFilter || periodFilter || typeFilter);

  return (
    <Card className="bg-zinc-50 mb-8 border-zinc-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Name search */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 pl-2">Nome do Aluno</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-[20px]">search</span>
            <input
              className="w-full bg-white border border-zinc-200 rounded-full pl-11 pr-4 py-2.5 text-sm font-medium focus:ring-0 focus:border-black transition-colors placeholder:text-zinc-300 outline-none"
              placeholder="Buscar aluno..."
              type="text"
              value={nameSearch}
              onChange={e => onNameSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Class filter */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 pl-2">Turma</label>
          <select
            className="w-full bg-white border border-zinc-200 rounded-full pl-4 pr-4 py-2.5 text-sm font-medium focus:ring-0 focus:border-black transition-colors outline-none"
            value={classFilter}
            onChange={e => onClassFilter(e.target.value)}
          >
            <option value="">Todas as turmas</option>
            {classes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Period filter */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 pl-2">Período</label>
          <select
            className="w-full bg-white border border-zinc-200 rounded-full pl-4 pr-4 py-2.5 text-sm font-medium focus:ring-0 focus:border-black transition-colors outline-none"
            value={periodFilter}
            onChange={e => onPeriodFilter(e.target.value)}
          >
            {PERIOD_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {/* Type filter */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 pl-2">Tipo de Transação</label>
          <select
            className="w-full bg-white border border-zinc-200 rounded-full pl-4 pr-4 py-2.5 text-sm font-medium focus:ring-0 focus:border-black transition-colors outline-none"
            value={typeFilter}
            onChange={e => onTypeFilter(e.target.value)}
          >
            {TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-zinc-200">
        <button
          onClick={onClear}
          disabled={!hasFilters}
          className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-black px-4 py-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Limpar
        </button>
        <Button size="sm" icon="filter_list">Aplicar Filtros</Button>
      </div>
    </Card>
  );
};
