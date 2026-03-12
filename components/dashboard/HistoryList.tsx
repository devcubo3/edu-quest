import React from 'react';
import { Card } from '../ui/Card';

interface HistoryItem {
  id: number;
  icon: string;
  title: string;
  date: string;
  displayDate: string;
  amount: string;
  type: string;
  category: string;
}

interface HistoryListProps {
  items: HistoryItem[];
  onClearFilters: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ items, onClearFilters }) => {
  return (
    <Card className="border-zinc-100 min-h-[400px]" noPadding>
        {items.length > 0 ? (
            <div className="divide-y divide-zinc-100">
                {items.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-zinc-50 transition-all group gap-4 sm:gap-0">
                    <div className="flex items-center gap-4">
                        <div className={`size-12 rounded-full flex items-center justify-center transition-colors shadow-sm ${item.type === 'good' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                            <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-black">{item.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${item.type === 'good' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{item.category}</span>
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">{item.displayDate}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4 pl-16 sm:pl-0">
                            <span className={`text-lg font-black ${item.type === 'bad' ? 'text-zinc-400' : 'text-black'}`}>{item.amount}</span>
                    </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-zinc-400">
                <span className="material-symbols-outlined text-4xl mb-2">inbox</span>
                <p className="text-sm font-bold">Nenhum registro encontrado</p>
                <button onClick={onClearFilters} className="mt-2 text-xs font-bold text-primary hover:underline">Limpar filtros</button>
            </div>
        )}
        
        {items.length > 0 && (
            <div className="p-6 text-center border-t border-zinc-100">
                <button className="text-xs font-bold text-zinc-400 uppercase tracking-widest hover:text-black transition-colors">Fim da lista</button>
            </div>
        )}
    </Card>
  );
};
