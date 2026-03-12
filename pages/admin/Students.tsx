import React, { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { PageHeader } from '../../components/ui/PageHeader';
import { StudentTable } from '../../components/admin/StudentTable';
import { StudentEditModal } from '../../components/admin/StudentEditModal';
import { MOCK_STUDENTS } from '../../constants';
import { Student } from '../../types';

export const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredStudents = MOCK_STUDENTS.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEditModal = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 bg-zinc-50/50">
        
        <PageHeader 
          title="Diretório de Alunos" 
          subtitle="Gestão" 
          action={
            <>
              <div className="relative w-full md:w-72">
                <Input 
                  icon="search" 
                  placeholder="Buscar..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white"
                />
              </div>
              <Button variant="secondary" icon="filter_list">Filtrar</Button>
              <Button icon="add">Adicionar</Button>
            </>
          }
        />

        <StudentTable 
          students={filteredStudents} 
          onManage={openEditModal} 
        />
      </main>

      {/* Edit Modal */}
      {isModalOpen && selectedStudent && (
        <StudentEditModal 
          student={selectedStudent} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};