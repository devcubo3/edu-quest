import React from 'react';
import { Header } from '../../components/layout/Header';
import { PageHeader } from '../../components/ui/PageHeader';
import { AdminStatCard } from '../../components/dashboard/AdminStatCard';
import { RankingList } from '../../components/dashboard/RankingList';
import { CoinFlowChart } from '../../components/dashboard/CoinFlowChart';
import { useTheme } from '../../context/ThemeContext';

const data = [
  { name: 'JUN', value: 4000 },
  { name: 'JUL', value: 3000 },
  { name: 'AGO', value: 2000 },
  { name: 'SET', value: 2780 },
  { name: 'OUT', value: 1890 },
  { name: 'NOV', value: 2390 },
];

export const AdminDashboard: React.FC = () => {
  const { branding } = useTheme();

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
              value="1.24M"
              icon="monetization_on"
              badgeText="+12.5%"
              badgeType="success"
            />
            <AdminStatCard 
              title="Alunos Ativos"
              value="842"
              icon="groups"
              badgeText="Estável"
              badgeType="neutral"
            />
            <AdminStatCard 
              title="Total de Turmas"
              value="48"
              icon="school"
              badgeText="+3 Novas"
              badgeType="success"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Global Ranking */}
            <div className="lg:col-span-2">
              <RankingList 
                title="Ranking Global"
                variant="admin"
                viewAllLink="#"
                primaryColor={branding.primaryColor}
                secondaryColor={branding.secondaryColor}
                items={[
                  { rank: 1, name: "Alexandra Hamilton", subtitle: "Turma 12-A • Dept Ciências", coins: "14,250" },
                  { rank: 2, name: "Marcus Chen", subtitle: "Turma 11-B • Dept Artes", coins: "12,890" },
                  { rank: 3, name: "Sarah Jenkins", subtitle: "Turma 10-C • Dept Matemática", coins: "11,405" },
                  { rank: 4, name: "Michael Ross", subtitle: "Turma 12-A • Dept Ciências", coins: "10,100" },
                ]}
              />
            </div>

            {/* Coin Flow Chart */}
            <div className="lg:col-span-1">
               <CoinFlowChart 
                 data={data}
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