import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { Podium } from '../../components/dashboard/Podium';
import { RankingTable } from '../../components/dashboard/RankingTable';
import { MOCK_STUDENT_USER } from '../../constants';

const RANKING_DATA = [
    { rank: 1, name: 'Marcus Thorne', class: 'Turma 10-A', coins: 4820, avatar: 'https://i.pravatar.cc/150?u=1' },
    { rank: 2, name: 'Elena Rodriguez', class: 'Turma 10-B', coins: 4650, avatar: 'https://i.pravatar.cc/150?u=2' },
    { rank: 3, name: 'Alex Johnson (Você)', class: 'Turma 10-A', coins: 2450, avatar: MOCK_STUDENT_USER.avatar, isMe: true },
    { rank: 4, name: 'Sarah Chen', class: 'Turma 10-C', coins: 2310, avatar: 'https://i.pravatar.cc/150?u=4' },
    { rank: 5, name: 'James Wilson', class: 'Turma 10-A', coins: 2100, avatar: 'https://i.pravatar.cc/150?u=5' },
    { rank: 6, name: 'Maria Garcia', class: 'Turma 10-B', coins: 1950, avatar: 'https://i.pravatar.cc/150?u=6' },
    { rank: 7, name: 'David Kim', class: 'Turma 10-A', coins: 1800, avatar: 'https://i.pravatar.cc/150?u=7' },
    { rank: 8, name: 'Lisa Wang', class: 'Turma 10-C', coins: 1650, avatar: 'https://i.pravatar.cc/150?u=8' },
    { rank: 9, name: 'Robert Smith', class: 'Turma 10-B', coins: 1500, avatar: 'https://i.pravatar.cc/150?u=9' },
    { rank: 10, name: 'Jennifer Lopez', class: 'Turma 10-A', coins: 1350, avatar: 'https://i.pravatar.cc/150?u=10' },
];

export const StudentRanking: React.FC = () => {
  const navigate = useNavigate();
  const [scope, setScope] = useState<'class' | 'global'>('global');
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'all'>('weekly');

  return (
    <div className="h-full flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 bg-background-light">
         <div className="max-w-4xl mx-auto w-full space-y-8">
            
            <PageHeader 
              title="Classificação" 
              subtitle="Ranking & Competição" 
              action={
                <Button variant="secondary" size="sm" icon="arrow_back" onClick={() => navigate('/student/dashboard')}>
                    Voltar
                </Button>
              }
            />

            {/* Control Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                
                {/* Scope Toggle */}
                <div className="bg-white p-1 rounded-full border border-zinc-200 flex shadow-sm">
                    <button 
                        onClick={() => setScope('global')}
                        className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${scope === 'global' ? 'bg-black text-white shadow-md' : 'text-zinc-500 hover:text-black'}`}
                    >
                        Global
                    </button>
                    <button 
                        onClick={() => setScope('class')}
                        className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${scope === 'class' ? 'bg-black text-white shadow-md' : 'text-zinc-500 hover:text-black'}`}
                    >
                        Minha Turma
                    </button>
                </div>

                {/* Period Select */}
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Período:</span>
                    <select 
                        className="bg-white border border-zinc-200 text-sm font-bold rounded-full px-4 py-2 focus:ring-2 focus:ring-primary outline-none cursor-pointer hover:border-black transition-colors"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value as any)}
                    >
                        <option value="weekly">Esta Semana</option>
                        <option value="monthly">Este Mês</option>
                        <option value="all">Todo o Período</option>
                    </select>
                </div>
            </div>

            <Podium data={RANKING_DATA} />

            <RankingTable data={RANKING_DATA} />
         </div>
      </main>
    </div>
  );
};