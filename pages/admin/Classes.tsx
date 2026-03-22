import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { ClassCard } from '../../components/admin/ClassCard';
import { CreateClassCard } from '../../components/admin/CreateClassCard';
import { ClassCreateModal } from '../../components/admin/ClassCreateModal';
import { useClasses } from '../../context/ClassesContext';
import { ClassItem } from '../../types';

export const Classes: React.FC = () => {
  const navigate = useNavigate();
  const { classes, addClass } = useClasses();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreate = (cls: ClassItem) => {
    addClass(cls);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <Header />

      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <PageHeader
          title="Gestão de Turmas"
          subtitle="Administração"
          action={
            <Button icon="add" onClick={() => setIsCreateModalOpen(true)}>
              Criar Turma
            </Button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {classes.map((cls, idx) => (
            <ClassCard
              key={cls.id}
              cls={cls}
              isFirst={idx === 0}
              onClick={() => navigate(`/admin/classes/${cls.id}`)}
            />
          ))}

          <CreateClassCard onClick={() => setIsCreateModalOpen(true)} />
        </div>
      </main>

      {isCreateModalOpen && (
        <ClassCreateModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
};
