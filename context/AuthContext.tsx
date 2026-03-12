import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { MOCK_ADMIN_USER, MOCK_STUDENT_USER } from '../constants';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check local storage on mount (simulated persistence)
  useEffect(() => {
    const storedUser = localStorage.getItem('eduquest_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (role: UserRole) => {
    const newUser = role === UserRole.ADMIN ? MOCK_ADMIN_USER : MOCK_STUDENT_USER;
    setUser(newUser);
    localStorage.setItem('eduquest_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eduquest_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};