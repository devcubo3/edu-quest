import React, { useState, useRef, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { PageHeader } from '../../components/ui/PageHeader';
import { StudentTable } from '../../components/admin/StudentTable';
import { StudentEditModal } from '../../components/admin/StudentEditModal';
import { StudentCreateModal } from '../../components/admin/StudentCreateModal';
import { StudentCoinsModal, CoinsTransactionInfo } from '../../components/admin/StudentCoinsModal';
import { useStudents } from '../../context/StudentsContext';
import { useTransactions } from '../../context/TransactionsContext';
import { Student, Transaction } from '../../types';

function formatTimestamp(): string {
  const now = new Date();
  const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  return `${now.getDate()} ${months[now.getMonth()]}., ${h}:${m}`;
}

export const Students: React.FC = () => {
  const { students, addStudent, updateStudent, removeStudent } = useStudents();
  const { addTransaction } = useTransactions();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCoinsModalOpen, setIsCoinsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allClasses = [...new Map(students.map(s => [s.class.toLowerCase(), s.class])).values()].sort();

  const filteredStudents = students.filter(student => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      student.name.toLowerCase().includes(term) ||
      student.class.toLowerCase().includes(term) ||
      student.studentId.toLowerCase().includes(term);
    const matchesClass = !filterClass || student.class.toLowerCase() === filterClass.toLowerCase();
    return matchesSearch && matchesClass;
  });

  const openEditModal = (student: Student) => { setSelectedStudent(student); setIsEditModalOpen(true); };
  const openCoinsModal = (student: Student) => { setSelectedStudent(student); setIsCoinsModalOpen(true); };

  const handleSaveCoins = (updated: Student, txInfo: CoinsTransactionInfo) => {
    updateStudent(updated);
    const tx: Transaction = {
      id: `tx-${Date.now()}`,
      timestamp: formatTimestamp(),
      dateMs: Date.now(),
      studentName: updated.name,
      studentInitials: updated.initials,
      studentClass: updated.class,
      description: txInfo.description,
      category: txInfo.category,
      amount: txInfo.amount,
      type: txInfo.type,
    };
    addTransaction(tx);
    console.log('Transação criada:', tx);
  };

  const clearFilters = () => { setFilterClass(''); setShowFilter(false); };
  const isFiltered = !!filterClass;

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
                  placeholder="Buscar por nome ou turma..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                )}
              </div>

              <div ref={filterRef} className="relative">
                <Button
                  variant={isFiltered ? 'primary' : 'secondary'}
                  icon="filter_list"
                  onClick={() => setShowFilter(prev => !prev)}
                >
                  Filtrar
                  {isFiltered && (
                    <span className="ml-1.5 size-5 bg-white/20 rounded-full text-[10px] font-black flex items-center justify-center">1</span>
                  )}
                </Button>

                {showFilter && (
                  <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-xl border border-zinc-100 z-30 overflow-hidden">
                    <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-zinc-800">Filtrar por Turma</h3>
                      {isFiltered && (
                        <button onClick={clearFilters} className="text-[10px] font-bold text-red-500 hover:underline uppercase tracking-wide">Limpar</button>
                      )}
                    </div>
                    <div className="p-3 space-y-1 max-h-60 overflow-y-auto">
                      <button
                        onClick={() => { setFilterClass(''); setShowFilter(false); }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${!filterClass ? 'bg-primary text-white' : 'text-zinc-700 hover:bg-zinc-50'}`}
                      >
                        <span className="material-symbols-outlined text-[18px]">groups</span>
                        Todas as turmas
                        <span className="ml-auto text-xs opacity-60">{students.length}</span>
                      </button>
                      {allClasses.map(cls => {
                        const count = students.filter(s => s.class.toLowerCase() === cls.toLowerCase()).length;
                        return (
                          <button
                            key={cls}
                            onClick={() => { setFilterClass(cls); setShowFilter(false); }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${filterClass === cls ? 'bg-primary text-white' : 'text-zinc-700 hover:bg-zinc-50'}`}
                          >
                            <span className="material-symbols-outlined text-[18px]">school</span>
                            {cls}
                            <span className="ml-auto text-xs opacity-60">{count}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <Button icon="add" onClick={() => setIsCreateModalOpen(true)}>Adicionar</Button>
            </>
          }
        />

        {isFiltered && (
          <div className="flex items-center gap-2 mb-4 -mt-4">
            <span className="text-xs text-zinc-500 font-medium">Filtrando por:</span>
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
              <span className="material-symbols-outlined text-[14px]">school</span>
              Turma: {filterClass}
              <button onClick={clearFilters} className="ml-1 hover:opacity-70 transition-opacity">
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            </span>
          </div>
        )}

        {filteredStudents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="material-symbols-outlined text-5xl text-zinc-300 mb-3">search_off</span>
            <p className="text-zinc-500 font-semibold">Nenhum aluno encontrado</p>
            <p className="text-zinc-400 text-sm mt-1">
              {searchTerm ? `Nenhum resultado para "${searchTerm}"` : `Nenhum aluno na turma "${filterClass}"`}
            </p>
            <button onClick={() => { setSearchTerm(''); clearFilters(); }} className="mt-4 text-sm font-bold text-primary hover:underline">
              Limpar filtros
            </button>
          </div>
        ) : (
          <StudentTable
            students={filteredStudents}
            onEdit={openEditModal}
            onDelete={(s) => removeStudent(s.id)}
            onManageCoins={openCoinsModal}
          />
        )}
      </main>

      {isEditModalOpen && selectedStudent && (
        <StudentEditModal
          student={selectedStudent}
          onClose={() => setIsEditModalOpen(false)}
          onSave={updateStudent}
        />
      )}

      {isCoinsModalOpen && selectedStudent && (
        <StudentCoinsModal
          student={selectedStudent}
          onClose={() => setIsCoinsModalOpen(false)}
          onSave={handleSaveCoins}
        />
      )}

      {isCreateModalOpen && (
        <StudentCreateModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={addStudent}
        />
      )}
    </div>
  );
};
