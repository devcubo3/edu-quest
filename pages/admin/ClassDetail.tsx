import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useClasses } from '../../context/ClassesContext';
import { useStudents } from '../../context/StudentsContext';
import { Student } from '../../types';

export const ClassDetail: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const { classes, removeClass } = useClasses();
  const { students, updateStudent } = useStudents();

  const [searchAdd, setSearchAdd] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const cls = classes.find(c => c.id === classId);

  if (!cls) {
    return (
      <div className="h-full flex flex-col bg-white">
        <Header />
        <div className="flex-1 flex items-center justify-center flex-col gap-4">
          <span className="material-symbols-outlined text-5xl text-zinc-300">search_off</span>
          <p className="text-zinc-500 font-semibold">Turma não encontrada</p>
          <Button onClick={() => navigate('/admin/classes')}>Voltar para Turmas</Button>
        </div>
      </div>
    );
  }

  const enrolled = students.filter(s => s.class.toLowerCase() === cls.name.toLowerCase());
  const available = students.filter(s =>
    s.class.toLowerCase() !== cls.name.toLowerCase() &&
    (s.name.toLowerCase().includes(searchAdd.toLowerCase()) ||
     s.studentId.toLowerCase().includes(searchAdd.toLowerCase()) ||
     !searchAdd)
  );

  const handleAdd = (student: Student) => {
    updateStudent({ ...student, class: cls.name });
  };

  const handleRemove = (student: Student) => {
    updateStudent({ ...student, class: '' });
  };

  const handleDelete = () => {
    enrolled.forEach(s => updateStudent({ ...s, class: '' }));
    removeClass(cls.id);
    navigate('/admin/classes');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <Header />

      <main className="flex-1 overflow-y-auto bg-zinc-50/50">
        {/* Class hero banner */}
        <div className="bg-white border-b border-zinc-100 px-8 lg:px-12 py-6">
          <button
            onClick={() => navigate('/admin/classes')}
            className="inline-flex items-center gap-1 text-xs font-bold text-zinc-400 hover:text-zinc-800 transition-colors mb-4 uppercase tracking-wide"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Turmas
          </button>

          <div className="flex items-center gap-4">
            <div className={`size-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${cls.color}`}>
              <span className="material-symbols-outlined text-white text-[26px]">school</span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-zinc-900">{cls.name}</h1>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mt-0.5">
                {cls.department} • {cls.room}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-black text-zinc-900">{enrolled.length}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Alunos</p>
              </div>
              <div className="h-10 w-px bg-zinc-100" />
              <span className="inline-flex items-center gap-1.5 bg-zinc-100 text-zinc-600 text-xs font-bold px-3 py-1.5 rounded-full">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                {cls.schedule}
              </span>
              <div className="h-10 w-px bg-zinc-100" />
              {confirmDelete ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-500">Confirmar exclusão?</span>
                  <button
                    onClick={handleDelete}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-red-500 text-white hover:bg-red-600 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">delete</span>
                    Excluir
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-zinc-200 text-zinc-500 hover:bg-zinc-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px]">delete</span>
                  Excluir Turma
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 lg:px-12 py-8 grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

          {/* Enrolled Students */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-black text-zinc-800">
                Alunos na Turma
                <span className="ml-2 text-sm font-bold text-zinc-400">({enrolled.length})</span>
              </h2>
            </div>

            <Card noPadding className="border-zinc-200">
              {enrolled.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <span className="material-symbols-outlined text-4xl text-zinc-300 mb-3">group_off</span>
                  <p className="text-zinc-500 font-semibold text-sm">Nenhum aluno nesta turma</p>
                  <p className="text-zinc-400 text-xs mt-1">Adicione alunos usando o painel ao lado</p>
                </div>
              ) : (
                <div className="divide-y divide-zinc-100">
                  {enrolled.map(student => (
                    <div key={student.id} className="flex items-center gap-3 px-5 py-4 hover:bg-zinc-50 transition-colors">
                      <div className={`size-9 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${student.colorClass}`}>
                        {student.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-zinc-800 truncate">{student.name}</p>
                        <p className="text-[10px] font-mono text-zinc-400">{student.studentId}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-500">{student.coins.toLocaleString()} moedas</span>
                        <button
                          onClick={() => handleRemove(student)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-red-500 border border-red-200 hover:bg-red-50 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">person_remove</span>
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Add Students Panel */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-base font-black text-zinc-800">Adicionar Alunos</h2>
              <p className="text-xs text-zinc-400 mt-0.5">{available.length} disponíveis</p>
            </div>

            <Card noPadding className="border-zinc-200">
              {/* Search */}
              <div className="p-4 border-b border-zinc-100">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-lg">search</span>
                  <input
                    type="text"
                    placeholder="Buscar aluno..."
                    value={searchAdd}
                    onChange={(e) => setSearchAdd(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-full text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-zinc-400"
                  />
                </div>
              </div>

              {/* Available students list */}
              <div className="max-h-[420px] overflow-y-auto divide-y divide-zinc-100">
                {available.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <span className="material-symbols-outlined text-3xl text-zinc-300 mb-2">person_search</span>
                    <p className="text-zinc-400 text-sm font-medium">
                      {searchAdd ? 'Nenhum resultado encontrado' : 'Todos os alunos já estão nesta turma'}
                    </p>
                  </div>
                ) : (
                  available.map(student => (
                    <div key={student.id} className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 transition-colors">
                      <div className={`size-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${student.colorClass}`}>
                        {student.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-zinc-800 truncate">{student.name}</p>
                        <p className="text-[10px] text-zinc-400 truncate">
                          {student.class ? `Turma: ${student.class}` : 'Sem turma'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleAdd(student)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-primary border border-primary/30 hover:bg-primary hover:text-white transition-colors flex-shrink-0"
                      >
                        <span className="material-symbols-outlined text-[14px]">person_add</span>
                        Adicionar
                      </button>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
};
