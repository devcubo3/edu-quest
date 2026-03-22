import React from 'react';
import { Card } from '../ui/Card';

interface RankingItem {
  rank: number;
  name: string;
  class: string;
  coins: number;
  avatar: string;
  isMe?: boolean;
  initials?: string;
  colorClass?: string;
}

interface RankingTableProps {
  data: RankingItem[];
}

export const RankingTable: React.FC<RankingTableProps> = ({ data }) => {
  return (
    <Card noPadding className="border-zinc-200 bg-white shadow-lg">
        <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-50 border-b border-zinc-100">
                <tr>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 w-20 text-center">Posição</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Aluno</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">XP Total</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.rank} className={`group transition-colors border-b border-zinc-50 last:border-none ${item.isMe ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-zinc-50'}`}>
                        <td className="px-6 py-4 text-center">
                            <span className={`font-black text-sm ${item.rank <= 3 ? 'text-primary' : 'text-zinc-400'}`}>#{item.rank}</span>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                                <div className={`size-10 rounded-full border-2 flex items-center justify-center text-xs font-bold overflow-hidden ${item.isMe ? 'border-primary' : 'border-zinc-100'} ${!item.avatar ? (item.colorClass ?? 'bg-zinc-100 text-zinc-500') : 'bg-zinc-100'}`}>
                                    {item.avatar
                                      ? <img src={item.avatar} alt={item.name} className="w-full h-full object-cover rounded-full"/>
                                      : <span>{item.initials ?? item.name.charAt(0)}</span>
                                    }
                                </div>
                                <div>
                                    <p className={`text-sm font-bold ${item.isMe ? 'text-primary' : 'text-black'}`}>
                                        {item.name} {item.isMe && '(Você)'}
                                    </p>
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase">{item.class}</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <span className="font-black text-lg">{item.coins}</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Card>
  );
};
