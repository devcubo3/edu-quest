import React, { useState, useMemo } from 'react';
import { Header } from '../../components/layout/Header';
import { PageHeader } from '../../components/ui/PageHeader';
import { TransactionFilters } from '../../components/admin/TransactionFilters';
import { TransactionTable } from '../../components/admin/TransactionTable';
import { useTransactions } from '../../context/TransactionsContext';
import { useStudents } from '../../context/StudentsContext';

const PAGE_SIZE = 10;
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export const Transactions: React.FC = () => {
  const { transactions } = useTransactions();
  const { students } = useStudents();

  const [tab, setTab] = useState<'live' | 'archived'>('live');
  const [nameSearch, setNameSearch] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [periodFilter, setPeriodFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [page, setPage] = useState(0);

  // Unique classes from registered students
  const classes = useMemo(() => {
    return [...new Map(
      students
        .filter(s => s.class)
        .map(s => [s.class.toLowerCase(), s.class])
    ).values()].sort();
  }, [students]);

  // Tab filter: "live" = last 30 days, "archived" = older than 30 days
  const tabFiltered = useMemo(() => {
    const now = Date.now();
    if (tab === 'archived') {
      return transactions.filter(t => !t.dateMs || t.dateMs < now - THIRTY_DAYS_MS);
    }
    // live: transactions from the last 30 days (or without dateMs)
    return transactions.filter(t => !t.dateMs || t.dateMs >= now - THIRTY_DAYS_MS);
  }, [transactions, tab]);

  // Apply all active filters
  const filtered = useMemo(() => {
    const now = Date.now();
    return tabFiltered.filter(tx => {
      if (nameSearch && !tx.studentName.toLowerCase().includes(nameSearch.toLowerCase())) return false;
      if (classFilter && tx.studentClass.toLowerCase() !== classFilter.toLowerCase()) return false;
      if (typeFilter && tx.type !== typeFilter) return false;
      if (periodFilter && tx.dateMs) {
        const days = parseInt(periodFilter);
        if (tx.dateMs < now - days * 24 * 60 * 60 * 1000) return false;
      }
      return true;
    });
  }, [tabFiltered, nameSearch, classFilter, typeFilter, periodFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const paginated = filtered.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);

  const handleClear = () => {
    setNameSearch('');
    setClassFilter('');
    setPeriodFilter('');
    setTypeFilter('');
    setPage(0);
  };

  const handleTabChange = (newTab: 'live' | 'archived') => {
    setTab(newTab);
    setPage(0);
  };

  const handleNameSearch = (v: string) => { setNameSearch(v); setPage(0); };
  const handleClassFilter = (v: string) => { setClassFilter(v); setPage(0); };
  const handlePeriodFilter = (v: string) => { setPeriodFilter(v); setPage(0); };
  const handleTypeFilter = (v: string) => { setTypeFilter(v); setPage(0); };

  return (
    <div className="h-full flex flex-col bg-white">
      <Header action={
        <div className="inline-flex rounded-full border border-zinc-200 p-1 hidden sm:flex">
          <button
            onClick={() => handleTabChange('live')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
              tab === 'live' ? 'bg-black text-white' : 'text-zinc-500 hover:text-black'
            }`}
          >
            Ao Vivo
          </button>
          <button
            onClick={() => handleTabChange('archived')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
              tab === 'archived' ? 'bg-black text-white' : 'text-zinc-500 hover:text-black'
            }`}
          >
            Arquivado
          </button>
        </div>
      } />

      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <PageHeader
          title="Registro de Transações"
          subtitle="Gestão de Dados"
        />

        <TransactionFilters
          nameSearch={nameSearch}
          onNameSearch={handleNameSearch}
          classFilter={classFilter}
          onClassFilter={handleClassFilter}
          periodFilter={periodFilter}
          onPeriodFilter={handlePeriodFilter}
          typeFilter={typeFilter}
          onTypeFilter={handleTypeFilter}
          classes={classes}
          onClear={handleClear}
        />

        <TransactionTable
          transactions={paginated}
          totalCount={filtered.length}
          page={safePage}
          pageSize={PAGE_SIZE}
          onPrevPage={() => setPage(p => Math.max(0, p - 1))}
          onNextPage={() => setPage(p => Math.min(totalPages - 1, p + 1))}
        />
      </main>
    </div>
  );
};
