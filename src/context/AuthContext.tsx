import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContextType, User } from '../types';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

// In a real application, this would communicate with a backend
const mockLogin = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        resolve({
          user: { id: '1', email, name: 'Demo User' },
          token: 'mock-jwt-token',
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

const mockRegister = async (email: string, password: string, name: string): Promise<{ user: User; token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password && name) {
        resolve({
          user: { id: '1', email, name },
          token: 'mock-jwt-token',
        });
      } else {
        reject(new Error('Invalid registration details'));
      }
    }, 1000);
  });
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if we have a token in localStorage
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      try {
        // In a real app, we would decode the JWT to get the user data
        // const decoded = jwtDecode(storedToken);
        // setUser(decoded.user);
        setUser({ id: '1', email: 'demo@example.com', name: 'Demo User' });
        setToken(storedToken);
      } catch (err) {
        localStorage.removeItem('auth_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user, token } = await mockLogin(email, password);
      setUser(user);
      setToken(token);
      localStorage.setItem('auth_token', token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user, token } = await mockRegister(email, password, name);
      setUser(user);
      setToken(token);
      localStorage.setItem('auth_token', token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;