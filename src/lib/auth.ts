
import { toast } from 'sonner';

interface User {
  username: string;
  displayName: string;
  avatarUrl: string;
  isPremium: boolean;
}

let currentUser: User | null = null;

const ADULT_CONTENT_CONFIRMATION_KEY = 'adult_content_confirmed';

export const login = (username: string, password: string): boolean => {
  // For demo purposes only - in a real app, this would be a secure API call
  if (username === 'edi' && password === '12345') {
    currentUser = {
      username: 'edi',
      displayName: 'Edi',
      avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=300&h=300',
      isPremium: true
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

export const confirmAdultContent = (): void => {
  localStorage.setItem(ADULT_CONTENT_CONFIRMATION_KEY, 'true');
};

export const hasConfirmedAdultContent = (): boolean => {
  return localStorage.getItem(ADULT_CONTENT_CONFIRMATION_KEY) === 'true';
};
