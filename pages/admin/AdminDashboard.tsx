import React, { useMemo } from 'react';
import { Header } from '../../components/layout/Header';
import { PageHeader } from '../../components/ui/PageHeader';
import { AdminStatCard } from '../../components/dashboard/AdminStatCard';
import { RankingList } from '../../components/dashboard/RankingList';
import { CoinFlowChart } from '../../components/dashboard/CoinFlowChart';
import { useTheme } from '../../context/ThemeContext';
import { useStudents } from '../../context/StudentsContext';
import { useClasses } from '../../context/ClassesContext';
import { useTransactions } from '../../context/TransactionsContext';

const chartData = [
  { name: 'JUN', value: 4000 },
  { name: 'JUL', value: 3000 },
  { name: 'AGO', value: 2000 },
  { name: 'SET', value: 2780 },
  { name: 'OUT', value: 1890 },
  { name: 'NOV', value: 2390 },
];

function formatCoins(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2).replace('.', ',')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace('.', ',')}k`;
  return n.toLocaleString('pt-BR');
}

export const AdminDashboard: React.FC = () => {
  const { branding } = useTheme();
  const { students } = useStudents();
  const { classes } = useClasses();
  const { transactions } = useTransactions();

  const totalCoins = useMemo(() => students.reduce((sum, s) => sum + s.coins, 0), [students]);

  const creditTransactions = useMemo(
    () => transactions.filter(t => t.type === 'credit'),
    [transactions]
  );

  const totalCredits = useMemo(() => {
    if (creditTransactions.length > 0) {
      return creditTransactions.reduce((sum: number, t: { amount: number }) => sum + t.amount, 0);
    }
    // Sem transações: usa o saldo dos alunos como base
    return students.reduce((sum: number, s: { coins: number }) => sum + s.coins, 0);
  }, [creditTransactions, students]);

  const rankingItems = useMemo(() => {
    return [...students]
      .sort((a, b) => b.coins - a.coins)
      .slice(0, 4)
      .map((s, i) => ({
        rank: i + 1,
        name: s.name,
        subtitle: `${s.class || 'Sem turma'}`,
        coins: s.coins.toLocaleString('pt-BR'),
        initials: s.initials,
        colorClass: s.colorClass,
      }));
  }, [students]);

  return (
    <div className="h-full flex flex-col bg-white">
      <Header />

      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <div className="max-w-[1600px] mx-auto w-full space-y-8">

          <PageHeader
            title="Visão Geral"
            subtitle="Ano Acadêmico 2024-2025"
          />

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AdminStatCard
              title="Moedas Distribuídas"
              value={formatCoins(totalCredits)}
              icon="monetization_on"
              badgeText={`${creditTransactions.length} entrada${creditTransactions.length !== 1 ? 's' : ''}`}
              badgeType="success"
            />
            <AdminStatCard
              title="Alunos Ativos"
              value={students.length}
              icon="groups"
              badgeText={`Saldo total: ${formatCoins(totalCoins)}`}
              badgeType="neutral"
            />
            <AdminStatCard
              title="Total de Turmas"
              value={classes.length}
              icon="school"
              badgeText={classes.length === 1 ? '1 turma' : `${classes.length} turmas`}
              badgeType="success"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Global Ranking */}
            <div className="lg:col-span-2">
              <RankingList
                title="Ranking Global"
                variant="admin"
                viewAllLink="/admin/students"
                primaryColor={branding.primaryColor}
                secondaryColor={branding.secondaryColor}
                items={rankingItems}
              />
            </div>

            {/* Coin Flow Chart */}
            <div className="lg:col-span-1">
              <CoinFlowChart
                data={chartData}
                primaryColor={branding.primaryColor}
                secondaryColor={branding.secondaryColor}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
