import React, { useMemo } from 'react';
import { Header } from '../../components/layout/Header';
import { PageHeader } from '../../components/ui/PageHeader';
import { StudentStatCard } from '../../components/dashboard/StudentStatCard';
import { RankingList } from '../../components/dashboard/RankingList';
import { ActivityList } from '../../components/dashboard/ActivityList';
import { useAuth } from '../../context/AuthContext';
import { useStudents } from '../../context/StudentsContext';
import { useTransactions } from '../../context/TransactionsContext';

function activityIcon(category: string): { icon: string; color: string } {
  const lower = category.toLowerCase();
  if (lower.includes('quiz') || lower.includes('acadêm') || lower.includes('excelência') || lower.includes('vencedor'))
    return { icon: 'task_alt', color: 'bg-emerald-100 text-emerald-600' };
  if (lower.includes('loja') || lower.includes('compra') || lower.includes('cantina') || lower.includes('combo'))
    return { icon: 'shopping_bag', color: 'bg-rose-100 text-rose-500' };
  if (lower.includes('voluntari') || lower.includes('social') || lower.includes('assistente'))
    return { icon: 'volunteer_activism', color: 'bg-purple-100 text-purple-600' };
  if (lower.includes('bônus') || lower.includes('presença') || lower.includes('semanal') || lower.includes('distribuição'))
    return { icon: 'emoji_events', color: 'bg-amber-100 text-amber-600' };
  if (lower.includes('atraso') || lower.includes('penalidade') || lower.includes('taxa'))
    return { icon: 'cancel', color: 'bg-red-100 text-red-500' };
  if (lower.includes('saldo') || lower.includes('inicial'))
    return { icon: 'account_balance', color: 'bg-blue-100 text-blue-600' };
  if (lower.includes('equipamento') || lower.includes('aluguel'))
    return { icon: 'devices', color: 'bg-orange-100 text-orange-600' };
  return { icon: 'paid', color: 'bg-zinc-100 text-zinc-600' };
}

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { students } = useStudents();
  const { transactions } = useTransactions();

  const studentRecord = students.find(s => s.id === user?.id);
  const myCoins = studentRecord?.coins ?? 0;
  const myClass = studentRecord?.class ?? user?.class ?? '';

  // Monthly summary: credits and debits from last 30 days for logged-in student
  const { monthGains, monthLosses } = useMemo(() => {
    const now = Date.now();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    const myTx = transactions.filter(
      t => t.studentName.toLowerCase() === (user?.name ?? '').toLowerCase()
        && t.dateMs && t.dateMs >= now - thirtyDays
    );
    const gains = myTx.filter(t => t.type === 'credit').reduce((sum: number, t) => sum + t.amount, 0);
    const losses = myTx.filter(t => t.type === 'debit').reduce((sum: number, t) => sum + t.amount, 0);
    return { monthGains: gains, monthLosses: losses };
  }, [transactions, user]);

  // Top 5 ranking from real students
  const rankingItems = useMemo(() => {
    return [...students]
      .sort((a, b) => b.coins - a.coins)
      .slice(0, 5)
      .map((s, i) => ({
        rank: String(i + 1).padStart(2, '0'),
        name: s.id === user?.id ? `${s.name} (Você)` : s.name,
        coins: s.coins.toLocaleString('pt-BR'),
        color: i === 0 ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : undefined,
        active: s.id === user?.id,
        avatar: s.avatar || undefined,
        initials: s.initials,
        colorClass: s.colorClass,
      }));
  }, [students, user]);

  // Recent activities: last 4 transactions for the logged-in student
  const recentActivities = useMemo(() => {
    const myTx = transactions.filter(
      t => t.studentName.toLowerCase() === (user?.name ?? '').toLowerCase()
    );
    return myTx.slice(0, 4).map(tx => {
      const isCredit = tx.type === 'credit';
      const { icon, color } = activityIcon(tx.category);
      return {
        icon,
        color,
        title: tx.description,
        date: tx.timestamp,
        amount: isCredit ? `+${tx.amount.toLocaleString()}` : `-${tx.amount.toLocaleString()}`,
        type: (isCredit ? 'good' : 'bad') as 'good' | 'bad',
      };
    });
  }, [transactions, user]);

  return (
    <div className="h-full flex flex-col bg-white">
      <Header />

      <main className="flex-1 overflow-y-auto p-8 lg:p-12 bg-background-light">
        <div className="max-w-[1440px] mx-auto w-full flex flex-col gap-8">

          <PageHeader
            title="Portal do Aluno"
            subtitle="Bem-vindo de volta"
          />

          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StudentStatCard
              title="Saldo Atual"
              value={myCoins.toLocaleString('pt-BR')}
              icon="payments"
              unit="CnaCoins"
            />

            <StudentStatCard
              title="Minha Turma"
              value={myClass || 'Sem turma'}
              icon="school"
              variant="primary"
            >
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[14px] text-white">groups</span>
                </div>
                <p className="text-xs font-bold text-white/90">
                  {students.filter(s => s.class.toLowerCase() === myClass.toLowerCase()).length} alunos na turma
                </p>
              </div>
            </StudentStatCard>

            <StudentStatCard
              title="Resumo do Mês"
              value=""
              icon="swap_vert"
              variant="summary"
            >
              <div className="flex items-center justify-between p-2 rounded-xl bg-green-50 border border-green-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-600 text-sm">trending_up</span>
                  <span className="text-xs font-bold text-green-800">Ganhos</span>
                </div>
                <span className="text-sm font-black text-green-700">
                  {monthGains > 0 ? `+${monthGains.toLocaleString('pt-BR')}` : '0'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-red-50 border border-red-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-500 text-sm">trending_down</span>
                  <span className="text-xs font-bold text-red-800">Perdas</span>
                </div>
                <span className="text-sm font-black text-red-600">
                  {monthLosses > 0 ? `-${monthLosses.toLocaleString('pt-BR')}` : '0'}
                </span>
              </div>
            </StudentStatCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
            {/* Ranking */}
            <div className="lg:col-span-6 space-y-6">
              <RankingList
                title="Top 5 Ranking"
                viewAllLink="/student/ranking"
                items={rankingItems}
              />
            </div>

            {/* History */}
            <div className="lg:col-span-4 space-y-6">
              <ActivityList
                title="Últimas Atividades"
                viewAllLink="/student/history"
                items={recentActivities}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
