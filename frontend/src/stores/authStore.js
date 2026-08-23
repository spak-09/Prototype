import { create } from 'zustand';
import { api } from '../services/api';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  loading: true,
  error: null,

  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    set({ token });
  },

  login: async (credentials) => {
    try {
      set({ error: null });
      const data = await api.auth.login(credentials);
      set({ user: data.user, token: data.token });
      localStorage.setItem('token', data.token);
      return data.user;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  register: async (userData) => {
    try {
      set({ error: null });
      const data = await api.auth.register(userData);
      set({ user: data.user, token: data.token });
      localStorage.setItem('token', data.token);
      return data.user;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  loadUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ loading: false });
      return;
    }
    try {
      const data = await api.auth.getMe();
      set({ user: data.user, token, loading: false });
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, token: null, loading: false });
    }
  },

  logout: async () => {
    try {
      await api.auth.logout();
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));
