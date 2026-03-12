import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { HistoryFilters } from '../../components/dashboard/HistoryFilters';
import { HistoryList } from '../../components/dashboard/HistoryList';

// Using mock data for history
const MOCK_HISTORY = [
    { id: 1, icon: 'task_alt', title: 'Conclusão de Quiz: Matemática Avançada', date: '2024-10-14', displayDate: '14 OUT, 2024', amount: '+50', type: 'good', category: 'Acadêmico' },
    { id: 2, icon: 'shopping_bag', title: 'Compra na Loja: Skin de Avatar', date: '2024-10-12', displayDate: '12 OUT, 2024', amount: '-120', type: 'bad', category: 'Loja' },
    { id: 3, icon: 'emoji_events', title: 'Bônus Semanal de Presença', date: '2024-10-10', displayDate: '10 OUT, 2024', amount: '+200', type: 'good', category: 'Sistema' },
    { id: 4, icon: 'auto_stories', title: 'Sequência de Leitura (7 dias)', date: '2024-10-08', displayDate: '08 OUT, 2024', amount: '+25', type: 'good', category: 'Desafio' },
    { id: 5, icon: 'science', title: 'Participação na Feira de Ciências', date: '2024-10-05', displayDate: '05 OUT, 2024', amount: '+150', type: 'good', category: 'Evento' },
    { id: 6, icon: 'lunch_dining', title: 'Compra na Cantina', date: '2024-10-01', displayDate: '01 OUT, 2024', amount: '-15', type: 'bad', category: 'Alimentação' },
    { id: 7, icon: 'volunteer_activism', title: 'Voluntariado na Biblioteca', date: '2024-09-28', displayDate: '28 SET, 2024', amount: '+300', type: 'good', category: 'Social' },
    { id: 8, icon: 'cancel', title: 'Atraso na Devolução de Livro', date: '2024-09-25', displayDate: '25 SET, 2024', amount: '-50', type: 'bad', category: 'Penalidade' },
];

export const StudentHistory: React.FC = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<'all' | 'good' | 'bad'>('all');
  const [dateRange, setDateRange] = useState('all');

  const filteredHistory = MOCK_HISTORY.filter(item => {
    // Filter by Type
    if (filterType !== 'all' && item.type !== filterType) return false;
    
    // Mock Logic for Date Dropdown
    if (dateRange === '7days') {
       return item.id <= 3;
    }
    if (dateRange === '30days') {
        return item.id <= 6;
    }

    return true;
  });

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
              items={filteredHistory}
              onClearFilters={handleClearFilters}
            />
         </div>
      </main>
    </div>
  );
};