import React from 'react';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { ClassCard } from '../../components/admin/ClassCard';
import { CreateClassCard } from '../../components/admin/CreateClassCard';
import { MOCK_CLASSES } from '../../constants';

export const Classes: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <PageHeader 
          title="Gestão de Turmas" 
          subtitle="Administração" 
          action={<Button icon="add">Criar Turma</Button>}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {MOCK_CLASSES.map((cls, idx) => (
             <ClassCard key={cls.id} cls={cls} isFirst={idx === 0} />
          ))}

          <CreateClassCard />
        </div>
      </main>
    </div>
  );
};