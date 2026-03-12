import React from 'react';
import { Header } from '../../components/layout/Header';
import { PageHeader } from '../../components/ui/PageHeader';
import { StudentStatCard } from '../../components/dashboard/StudentStatCard';
import { RankingList } from '../../components/dashboard/RankingList';
import { ActivityList } from '../../components/dashboard/ActivityList';
import { MOCK_STUDENT_USER } from '../../constants';

export const StudentDashboard: React.FC = () => {
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
                 value="2,450"
                 icon="payments"
                 unit="EduCoins"
               />
               
               <StudentStatCard
                 title="Minha Turma"
                 value={MOCK_STUDENT_USER.class}
                 icon="school"
                 variant="primary"
               >
                 <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[14px] text-white">person</span>
                    </div>
                    <p className="text-xs font-bold text-white/90">Prof. Sarah Miller</p>
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
                    <span className="text-sm font-black text-green-700">+450</span>
                 </div>
                 <div className="flex items-center justify-between p-2 rounded-xl bg-red-50 border border-red-100">
                    <div className="flex items-center gap-2">
                         <span className="material-symbols-outlined text-red-500 text-sm">trending_down</span>
                         <span className="text-xs font-bold text-red-800">Perdas</span>
                    </div>
                    <span className="text-sm font-black text-red-600">-120</span>
                 </div>
               </StudentStatCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
               {/* Ranking */}
               <div className="lg:col-span-6 space-y-6">
                  <RankingList 
                    title="Top 5 Ranking"
                    viewAllLink="/student/ranking"
                    items={[
                      { rank: '01', name: 'Marcus Thorne', coins: '4,820', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
                      { rank: '02', name: 'Elena Rodriguez', coins: '4,650' },
                      { rank: '03', name: 'Alex Johnson (Você)', coins: '2,450', active: true, avatar: MOCK_STUDENT_USER.avatar },
                      { rank: '04', name: 'Sarah Chen', coins: '2,310' },
                      { rank: '05', name: 'James Wilson', coins: '2,100' },
                    ]}
                  />
               </div>

               {/* History */}
               <div className="lg:col-span-4 space-y-6">
                  <ActivityList 
                    title="Últimas Atividades"
                    viewAllLink="/student/history"
                    items={[
                      { icon: 'task_alt', title: 'Conclusão de Quiz', date: '14 OUT', amount: '+50', type: 'good', color: 'bg-emerald-100 text-emerald-600' },
                      { icon: 'shopping_bag', title: 'Compra na Loja', date: '12 OUT', amount: '-120', type: 'bad', color: 'bg-rose-100 text-rose-500' },
                      { icon: 'emoji_events', title: 'Bônus Semanal', date: '10 OUT', amount: '+200', type: 'good', color: 'bg-amber-100 text-amber-600' },
                      { icon: 'auto_stories', title: 'Sequência de Leitura', date: '08 OUT', amount: '+25', type: 'good', color: 'bg-blue-100 text-blue-600' },
                    ]}
                  />
               </div>
            </div>
         </div>
      </main>
    </div>
  );
};