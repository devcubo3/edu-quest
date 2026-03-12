import React from 'react';

interface HistoryFiltersProps {
  filterType: 'all' | 'good' | 'bad';
  setFilterType: (type: 'all' | 'good' | 'bad') => void;
  dateRange: string;
  setDateRange: (range: string) => void;
}

export const HistoryFilters: React.FC<HistoryFiltersProps> = ({
  filterType,
  setFilterType,
  dateRange,
  setDateRange,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-[20px] border border-zinc-100 shadow-sm">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            <button 
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all ${filterType === 'all' ? 'bg-black text-white shadow-md' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}
            >
                Todos
            </button>
            <button 
                onClick={() => setFilterType('good')}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all ${filterType === 'good' ? 'bg-green-600 text-white shadow-md' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}
            >
                Ganhos
            </button>
            <button 
                onClick={() => setFilterType('bad')}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all ${filterType === 'bad' ? 'bg-red-500 text-white shadow-md' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}
            >
                Perdas
            </button>
        </div>
        
        <div className="relative w-full md:w-48">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-lg pointer-events-none">calendar_today</span>
            <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full appearance-none bg-zinc-50 border border-zinc-200 rounded-full pl-10 pr-8 py-2 text-xs font-bold uppercase text-zinc-600 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer"
            >
                <option value="all">Todas as Datas</option>
                <option value="7days">Últimos 7 dias</option>
                <option value="30days">Últimos 30 dias</option>
            </select>
             <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 text-lg pointer-events-none">expand_more</span>
        </div>
    </div>
  );
};
