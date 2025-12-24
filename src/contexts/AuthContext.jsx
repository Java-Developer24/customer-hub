import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

// Sample test accounts
const TEST_ACCOUNTS = {
  'customer@test.com': {
    id: 'cust-001',
    email: 'customer@test.com',
    password: 'password123',
    name: 'John Customer',
    role: 'customer',
    avatar: null,
    phone: '+1 (555) 123-4567',
    address: '123 Main St, San Francisco, CA 94102',
    createdAt: '2024-01-15T10:30:00Z',
  },
  'admin@test.com': {
    id: 'admin-001',
    email: 'admin@test.com',
    password: 'password123',
    name: 'Admin User',
    role: 'admin',
    avatar: null,
    phone: '+1 (555) 987-6543',
    address: '456 Admin Ave, San Francisco, CA 94103',
    createdAt: '2023-06-01T08:00:00Z',
  },
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const testAccount = TEST_ACCOUNTS[email.toLowerCase()];
    
    if (testAccount && testAccount.password === password) {
      const { password: _, ...userData } = testAccount;
      setUser(userData);
      setIsLoading(false);
      return { success: true, user: userData };
    }
    
    // For demo: allow any email with 'admin' in it to be admin
    const mockUser = {
      id: Date.now().toString(),
      email: email,
      name: email.split('@')[0],
      role: email.toLowerCase().includes('admin') ? 'admin' : 'customer',
      avatar: null,
      phone: '',
      address: '',
      createdAt: new Date().toISOString(),
    };
    
    setUser(mockUser);
    setIsLoading(false);
    return { success: true, user: mockUser };
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: Date.now().toString(),
      email: email,
      name: name,
      role: 'customer',
      avatar: null,
      phone: '',
      address: '',
      createdAt: new Date().toISOString(),
    };
    
    setUser(mockUser);
    setIsLoading(false);
    return { success: true, user: mockUser };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = async (updates) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(prev => ({ ...prev, ...updates }));
    setIsLoading(false);
    return { success: true };
  };

  const changePassword = async (currentPassword, newPassword) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading(false);
    // In real app, validate current password and update
    return { success: true };
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    updateProfile,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
