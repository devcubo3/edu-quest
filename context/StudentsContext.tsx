import React, { createContext, useContext, useState } from 'react';
import { Student } from '../types';
import { MOCK_STUDENTS } from '../constants';

interface StudentsContextType {
  students: Student[];
  addStudent: (student: Student) => void;
  updateStudent: (updated: Student) => void;
  removeStudent: (id: string) => void;
}

const StudentsContext = createContext<StudentsContextType | undefined>(undefined);

export const StudentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);

  const addStudent = (s: Student) => setStudents(prev => [...prev, s]);
  const updateStudent = (updated: Student) => setStudents(prev => prev.map(s => s.id === updated.id ? updated : s));
  const removeStudent = (id: string) => setStudents(prev => prev.filter(s => s.id !== id));

  return (
    <StudentsContext.Provider value={{ students, addStudent, updateStudent, removeStudent }}>
      {children}
    </StudentsContext.Provider>
  );
};

export const useStudents = () => {
  const ctx = useContext(StudentsContext);
  if (!ctx) throw new Error('useStudents must be used within StudentsProvider');
  return ctx;
};
