import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { Podium } from '../../components/dashboard/Podium';
import { RankingTable } from '../../components/dashboard/RankingTable';
import { useAuth } from '../../context/AuthContext';
import { useStudents } from '../../context/StudentsContext';
import { useTransactions } from '../../context/TransactionsContext';

const PERIOD_LABELS: Record<string, string> = {
  weekly: 'Esta Semana',
  monthly: 'Este Mês',
  all: 'Todo o Período',
};

const PERIOD_MS: Record<string, number> = {
  weekly: 7 * 24 * 60 * 60 * 1000,
  monthly: 30 * 24 * 60 * 60 * 1000,
};

export const StudentRanking: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { students } = useStudents();
  const { transactions } = useTransactions();
  const [scope, setScope] = useState<'class' | 'global'>('global');
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'all'>('all');
  const [showPeriodMenu, setShowPeriodMenu] = useState(false);
  const periodRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (periodRef.current && !periodRef.current.contains(e.target as Node)) {
        setShowPeriodMenu(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const rankingData = useMemo(() => {
    // Filter by scope
    const filtered = scope === 'class'
      ? students.filter(s => s.class.toLowerCase() === (user?.class ?? '').toLowerCase())
      : students;

    if (period === 'all') {
      // Total balance ranking
      return [...filtered]
        .sort((a, b) => b.coins - a.coins)
        .map((s, i) => ({
          rank: i + 1,
          name: s.name,
          class: s.class ? `Turma ${s.class}` : 'Sem turma',
          coins: s.coins,
          avatar: s.avatar || '',
          initials: s.initials,
          colorClass: s.colorClass,
          isMe: s.id === user?.id,
        }));
    }

    // Period-based ranking: sum credit transactions within the period
    const now = Date.now();
    const cutoff = now - PERIOD_MS[period];
    const periodCredits = transactions.filter(
      t => t.type === 'credit' && t.dateMs && t.dateMs >= cutoff
    );

    // Sum credits per student name
    const coinsByName = new Map<string, number>();
    periodCredits.forEach(t => {
      coinsByName.set(t.studentName, (coinsByName.get(t.studentName) ?? 0) + t.amount);
    });

    return [...filtered]
      .map(s => ({ ...s, periodCoins: coinsByName.get(s.name) ?? 0 }))
      .sort((a, b) => b.periodCoins - a.periodCoins)
      .map((s, i) => ({
        rank: i + 1,
        name: s.name,
        class: s.class ? `Turma ${s.class}` : 'Sem turma',
        coins: s.periodCoins,
        avatar: s.avatar || '',
        initials: s.initials,
        colorClass: s.colorClass,
        isMe: s.id === user?.id,
      }));
  }, [students, user, scope, period, transactions]);

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

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Período:</span>
              <div ref={periodRef} className="relative">
                <button
                  onClick={() => setShowPeriodMenu(p => !p)}
                  className="bg-white border border-zinc-200 text-sm font-bold rounded-full px-5 py-2 outline-none cursor-pointer hover:border-black transition-colors"
                >
                  {PERIOD_LABELS[period]}
                </button>
                {showPeriodMenu && (
                  <div className="absolute top-full mt-2 right-0 bg-white border border-zinc-200 rounded-2xl shadow-lg overflow-hidden z-20 min-w-[160px]">
                    {Object.entries(PERIOD_LABELS).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => { setPeriod(key as 'weekly' | 'monthly' | 'all'); setShowPeriodMenu(false); }}
                        className={`w-full text-left px-5 py-3 text-sm font-bold hover:bg-zinc-50 transition-colors ${period === key ? 'text-black' : 'text-zinc-400'}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {rankingData.length >= 3 && <Podium data={rankingData} />}
          <RankingTable data={rankingData} />

        </div>
      </main>
    </div>
  );
};
