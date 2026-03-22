import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';

interface RankingItem {
  rank: string | number;
  name: string;
  coins: string | number;
  color?: string;
  active?: boolean;
  avatar?: string;
  subtitle?: string;
  initials?: string;
  colorClass?: string;
}

interface RankingListProps {
  title: string;
  items: RankingItem[];
  viewAllLink?: string;
  variant?: 'admin' | 'student';
  primaryColor?: string;
  secondaryColor?: string;
}

export const RankingList: React.FC<RankingListProps> = ({ 
  title, 
  items, 
  viewAllLink, 
  variant = 'student',
  primaryColor = '#135bec',
  secondaryColor = '#000000'
}) => {
  if (variant === 'admin') {
    return (
      <Card className="h-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-xl font-black tracking-tight mb-1">{title}</h3>
            <p className="text-xs text-zinc-400 font-medium">Alunos com melhor desempenho no semestre</p>
          </div>
          {viewAllLink && (
            <Link to={viewAllLink} className="text-xs font-bold uppercase tracking-widest border-b border-black pb-0.5 hover:opacity-70">
              Ver Lista Completa
            </Link>
          )}
        </div>
        
        <div className="space-y-3">
          {items.map((student, index) => {
            const isTop = index === 0;
            return (
              <div key={index} 
                  className={`flex items-center p-4 rounded-[16px] border transition-colors ${isTop ? 'bg-zinc-50 border-primary/20' : 'bg-white border-zinc-100 hover:bg-zinc-50'}`}
                  style={isTop ? { backgroundColor: `${primaryColor}10` } : {}}
              >
                <div 
                  className={`flex items-center justify-center size-8 rounded-full font-bold text-sm mr-4 ${isTop ? 'shadow-lg text-white' : 'bg-zinc-100 text-zinc-500'}`}
                  style={isTop ? { backgroundColor: primaryColor } : {}}
                >
                  {student.rank}
                </div>
                <div className={`size-10 rounded-full overflow-hidden mr-4 flex items-center justify-center text-xs font-bold ${student.colorClass || 'bg-zinc-100 text-zinc-500'}`}>
                  {student.avatar
                    ? <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                    : student.initials || student.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm">{student.name}</h4>
                  {student.subtitle && <p className="text-[10px] uppercase font-bold text-zinc-400">{student.subtitle}</p>}
                </div>
                <div className="text-right">
                  <p className="font-black text-lg" style={{ color: secondaryColor }}>{student.coins}</p>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase">Moedas</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-yellow-400 animate-pulse"></span>
            <h3 className="text-lg font-black uppercase tracking-widest">{title}</h3>
          </div>
          {viewAllLink && (
            <Link to={viewAllLink} className="text-[10px] font-bold text-primary hover:text-black transition-colors hover:underline uppercase tracking-wide bg-primary/5 px-3 py-1 rounded-full">
              VER TODOS
            </Link>
          )}
      </div>
      <Card noPadding className="border-zinc-100 bg-white overflow-visible">
          <table className="w-full text-left">
            <thead className="border-b border-zinc-100 bg-zinc-50/50">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Pos</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Aluno</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">XP</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
                {items.map((item, idx) => (
                  <tr key={idx} className={`${item.active ? 'bg-primary/5' : 'hover:bg-zinc-50'} transition-colors relative`}>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-black ${idx === 0 ? 'text-yellow-500 text-base' : 'text-zinc-500'}`}>#{item.rank}</span>
                      </td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className={`size-8 rounded-full border-2 flex items-center justify-center font-bold text-[10px] ${item.active ? 'border-primary' : 'border-white'} ${item.colorClass || item.color || 'bg-zinc-100 text-zinc-500'} overflow-hidden`}>
                          {item.avatar
                            ? <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                            : (item.initials || item.name.charAt(0))
                          }
                        </div>
                        <span className={`text-sm font-bold ${item.active ? 'text-primary' : 'text-zinc-700'}`}>{item.name}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-black text-right text-secondary">{item.coins}</td>
                      {item.active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"></div>}
                  </tr>
                ))}
            </tbody>
          </table>
      </Card>
    </div>
  );
};
