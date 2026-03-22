import React, { createContext, useContext, useState } from 'react';
import { ClassItem } from '../types';
import { MOCK_CLASSES } from '../constants';

interface ClassesContextType {
  classes: ClassItem[];
  addClass: (cls: ClassItem) => void;
  updateClass: (cls: ClassItem) => void;
  removeClass: (id: string) => void;
}

const ClassesContext = createContext<ClassesContextType | undefined>(undefined);

export const ClassesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [classes, setClasses] = useState<ClassItem[]>(MOCK_CLASSES);

  const addClass = (cls: ClassItem) => setClasses(prev => [...prev, cls]);
  const updateClass = (cls: ClassItem) => setClasses(prev => prev.map(c => c.id === cls.id ? cls : c));
  const removeClass = (id: string) => setClasses(prev => prev.filter(c => c.id !== id));

  return (
    <ClassesContext.Provider value={{ classes, addClass, updateClass, removeClass }}>
      {children}
    </ClassesContext.Provider>
  );
};

export const useClasses = () => {
  const ctx = useContext(ClassesContext);
  if (!ctx) throw new Error('useClasses must be used within ClassesProvider');
  return ctx;
};
