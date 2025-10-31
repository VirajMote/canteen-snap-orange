import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, Student } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock student database
const studentDatabase: Record<string, string> = {
  "12345": "Sushil Ashok Pote",
  "67890": "Rahul Sharma",
  "11111": "Priya Patel", 
  "22222": "Amit Kumar",
  "33333": "Sneha Desai"
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const savedStudent = localStorage.getItem('student');
    if (savedStudent) {
      setStudent(JSON.parse(savedStudent));
    }
  }, []);

  const login = async (rollNumber: string): Promise<void> => {
    const studentName = studentDatabase[rollNumber];
    
    if (!studentName) {
      throw new Error('Invalid roll number');
    }

    const studentData: Student = {
      rollNumber,
      name: studentName
    };

    setStudent(studentData);
    localStorage.setItem('student', JSON.stringify(studentData));
  };

  const logout = () => {
    setStudent(null);
    localStorage.removeItem('student');
  };

  const value: AuthContextType = {
    student,
    login,
    logout,
    isAuthenticated: !!student
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};