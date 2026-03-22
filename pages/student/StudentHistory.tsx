import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { HistoryFilters } from '../../components/dashboard/HistoryFilters';
import { HistoryList } from '../../components/dashboard/HistoryList';
import { useAuth } from '../../context/AuthContext';
import { useTransactions } from '../../context/TransactionsContext';

const PERIOD_MS: Record<string, number> = {
  '7days': 7 * 24 * 60 * 60 * 1000,
  '30days': 30 * 24 * 60 * 60 * 1000,
};

function categoryIcon(category: string): string {
  const lower = category.toLowerCase();
  if (lower.includes('quiz') || lower.includes('acadêm') || lower.includes('excelência')) return 'task_alt';
  if (lower.includes('loja') || lower.includes('compra') || lower.includes('cantina')) return 'shopping_bag';
  if (lower.includes('voluntari') || lower.includes('social')) return 'volunteer_activism';
  if (lower.includes('bônus') || lower.includes('presença') || lower.includes('semanal') || lower.includes('distribuição')) return 'emoji_events';
  if (lower.includes('atraso') || lower.includes('penalidade') || lower.includes('taxa')) return 'cancel';
  if (lower.includes('saldo') || lower.includes('inicial')) return 'account_balance';
  if (lower.includes('equipamento') || lower.includes('aluguel')) return 'devices';
  return 'paid';
}

export const StudentHistory: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { transactions } = useTransactions();
  const [filterType, setFilterType] = useState<'all' | 'good' | 'bad'>('all');
  const [dateRange, setDateRange] = useState('all');

  const historyItems = useMemo(() => {
    // Filter transactions for the logged-in student
    const myTx = transactions.filter(
      t => t.studentName.toLowerCase() === (user?.name ?? '').toLowerCase()
    );

    // Convert to HistoryList format
    return myTx.map((tx, i) => {
      const isCredit = tx.type === 'credit';
      return {
        id: i + 1,
        icon: categoryIcon(tx.category),
        title: tx.description,
        date: tx.dateMs ? new Date(tx.dateMs).toISOString().slice(0, 10) : '',
        dateMs: tx.dateMs,
        displayDate: tx.timestamp,
        amount: isCredit ? `+${tx.amount.toLocaleString()}` : `-${tx.amount.toLocaleString()}`,
        type: isCredit ? 'good' : 'bad',
        category: tx.category,
      };
    });
  }, [transactions, user]);

  const filtered = useMemo(() => {
    const now = Date.now();
    return historyItems.filter(item => {
      // Type filter
      if (filterType !== 'all' && item.type !== filterType) return false;

      // Date range filter
      if (dateRange !== 'all' && PERIOD_MS[dateRange]) {
        if (!item.dateMs || item.dateMs < now - PERIOD_MS[dateRange]) return false;
      }

      return true;
    });
  }, [historyItems, filterType, dateRange]);

  const handleClearFilters = () => {
    setFilterType('all');
    setDateRange('all');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <Header />

      <main className="flex-1 overflow-y-auto p-8 lg:p-12 bg-background-light">
        <div className="max-w-4xl mx-auto w-full space-y-6">

          <PageHeader
            title="Histórico de Atividades"
            subtitle="Portal do Aluno"
            action={
              <Button variant="secondary" size="sm" icon="arrow_back" onClick={() => navigate('/student/dashboard')}>
                Voltar
              </Button>
            }
          />

          <HistoryFilters
            filterType={filterType}
            setFilterType={setFilterType}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />

          <HistoryList
            items={filtered}
            onClearFilters={handleClearFilters}
          />
        </div>
      </main>
    </div>
  );
};
