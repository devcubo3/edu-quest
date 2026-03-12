import React from 'react';
import { Header } from '../../components/layout/Header';
import { PageHeader } from '../../components/ui/PageHeader';
import { TransactionFilters } from '../../components/admin/TransactionFilters';
import { TransactionTable } from '../../components/admin/TransactionTable';
import { MOCK_TRANSACTIONS } from '../../constants';

export const Transactions: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-white">
      <Header action={
         <div className="inline-flex rounded-full border border-zinc-200 p-1 hidden sm:flex">
            <button className="px-4 py-1.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider">Ao Vivo</button>
            <button className="px-4 py-1.5 rounded-full text-zinc-500 hover:text-black text-xs font-bold uppercase tracking-wider transition-colors">Arquivado</button>
          </div>
      } />
      
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <PageHeader 
          title="Registro de Transações" 
          subtitle="Gestão de Dados" 
        />

        <TransactionFilters />

        <TransactionTable transactions={MOCK_TRANSACTIONS as any} />
      </main>
    </div>
  );
};