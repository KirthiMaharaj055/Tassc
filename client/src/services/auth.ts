import API from './api';
import axios from 'axios';
interface AuthData {
  email: string;
  password: string;
}

export const login = async (formData: AuthData): Promise<void> => {
  try {
    const res = await axios.post('/api/auth/login', formData); ///api/auth/login
    localStorage.setItem('token', res.data.token);
  } catch (error) {
    console.error('Login error:', error);
    throw error; // Re-throw the error for handling in the calling function
  }
};


export const register = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await fetch('/api/auth/register', { //api/auth/register/
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};
