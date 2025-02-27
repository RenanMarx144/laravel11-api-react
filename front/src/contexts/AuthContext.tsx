import { createContext, useContext, useEffect, useState } from "react";
import api from "../axios";

interface User {
  id: number;
  name: string;
  email: string;
  role:string
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  setUser: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/user");
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await api.post('/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error; // Importante para tratar erros nos componentes
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      await api.get('/sanctum/csrf-cookie');
      await api.post('/login', credentials);
      const userResponse = await api.get('/user');
      setUser(userResponse.data);
    } catch (error) {
      setUser(null);
      throw error; // Permite tratamento de erro nos formulários
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    setUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? children : <div>Carregando...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);