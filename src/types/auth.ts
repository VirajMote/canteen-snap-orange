export interface Student {
  rollNumber: string;
  name: string;
  isAdmin?: boolean;
}

export interface AuthContextType {
  student: Student | null;
  login: (rollNumber: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}