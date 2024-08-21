import API from './api';

interface AuthData {
  email: string;
  password: string;
}

export const register = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await API.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const login = async (formData: AuthData): Promise<void> => {
  try {
    const res = await API.post('/auth/login', formData);
    localStorage.setItem('token', res.data.token);
  } catch (error) {
    console.error('Login error:', error);
    throw error; // Re-throw the error for handling in the calling function
  }
};