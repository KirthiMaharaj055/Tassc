import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


const API_URL = 'http://localhost:3000/api';

// Helper function to get token
const getToken = () => localStorage.getItem('token');

export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  return axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = async (userData: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  localStorage.setItem('token', response.data.token); // Store token
  return response.data;
};

export const fetchTasks = async () => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/tasks`, {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};

export const createTask = async (taskData: { title: string; description?: string; status: string; dueDate?: Date }) => {
  const token = getToken();
  const response = await axios.post(`${API_URL}/tasks`, taskData, {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};

export const updateTask = async (id: string, taskData: { title?: string; description?: string; status?: string; dueDate?: Date }) => {
  const token = getToken();
  const response = await axios.put(`${API_URL}/tasks/${id}`, taskData, {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};

export const deleteTask = async (id: string) => {
  const token = getToken();
  const response = await axios.delete(`${API_URL}/tasks/${id}`, {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};

reportWebVitals();