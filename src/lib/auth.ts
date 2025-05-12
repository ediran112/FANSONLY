
import { toast } from 'sonner';

interface User {
  username: string;
  displayName: string;
}

let currentUser: User | null = null;

export const login = (username: string, password: string): boolean => {
  // For demo purposes only - in a real app, this would be a secure API call
  if (username === 'edi' && password === '12345') {
    currentUser = {
      username: 'edi',
      displayName: 'Edi',
    };
    localStorage.setItem('user', JSON.stringify(currentUser));
    return true;
  } else {
    toast.error('Credenciais inválidas');
    return false;
  }
};

export const logout = (): void => {
  currentUser = null;
  localStorage.removeItem('user');
  window.location.href = '/';
};

export const getUser = (): User | null => {
  if (currentUser) return currentUser;
  
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    return currentUser;
  }
  
  return null;
};

export const isAuthenticated = (): boolean => {
  return getUser() !== null;
};
