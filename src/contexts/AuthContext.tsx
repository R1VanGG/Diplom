import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginCredentials, RegisterData } from '../types';
import { mockUsers } from '../data/mockData';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing user session
    const storedUser = localStorage.getItem('user');
    const userRole = Cookies.get('userRole');
    
    if (storedUser && userRole) {
      const parsedUser = JSON.parse(storedUser);
      // Ensure the role from cookie matches the stored user
      if (parsedUser.role === userRole) {
        setUser(parsedUser);
      } else {
        // If there's a mismatch, clear everything
        localStorage.removeItem('user');
        Cookies.remove('userRole');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const foundUser = mockUsers.find(
        u => u.username === credentials.username && u.password === credentials.password
      );
      
      if (!foundUser) {
        throw new Error('Invalid credentials');
      }
      
      // Remove password from user data before storing
      const { password, ...userWithoutPassword } = foundUser;
      
      // Set cookie with user role
      Cookies.set('userRole', userWithoutPassword.role, { 
        expires: 7, // Cookie expires in 7 days
        sameSite: 'strict',
        secure: true
      });
      
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    Cookies.remove('userRole');
    setUser(null);
  };

  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if username already exists
      const existingUser = mockUsers.find(u => u.username === data.username);
      if (existingUser) {
        throw new Error('Username already exists');
      }
      
      // In a real app, this would be handled by the backend
      // For demo purposes, we'll just simulate a successful registration
      const newUser: User = {
        id: `user-${Date.now()}`,
        username: data.username,
        fullName: data.fullName,
        district: data.district,
        email: data.email || '',
        phone: data.phone,
        role: 'resident',
      };
      
      // Set cookie with user role
      Cookies.set('userRole', newUser.role, { 
        expires: 7,
        sameSite: 'strict',
        secure: true
      });
      
      // Auto-login after registration
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}