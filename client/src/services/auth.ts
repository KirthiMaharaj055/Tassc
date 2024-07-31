import API from './api';
import axios from 'axios';
interface AuthData {
  email: string;
  password: string;
}

export const login = async (formData: AuthData): Promise<void> => {
  const res = await API.post('/auth/login', formData);
  localStorage.setItem('token', res.data.token);
};

export const register = async (formData: AuthData & { name: string }): Promise<void> => {
  await API.post('/auth/register', formData);
};
