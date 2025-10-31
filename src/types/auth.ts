export interface Student {
  rollNumber: string;
  name: string;
}

export interface AuthContextType {
  student: Student | null;
  login: (rollNumber: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}