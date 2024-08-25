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

// API URL
const API_URL = 'http://localhost:5001/api';

// Helper function to get token from localStorage
const getToken = () => localStorage.getItem('token');

// Function to register a user
export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Function to log in a user
export const loginUser = async (userData: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    localStorage.setItem('token', response.data.token); // Store token in localStorage
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Function to fetch tasks
export const fetchTasks = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: { 'x-auth-token': token },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Function to create a task
export const createTask = async (taskData: { title: string; description?: string; status: string; dueDate?: Date }) => {
  try {
    const token = getToken();
    const response = await axios.post(`${API_URL}/tasks`, taskData, {
      headers: { 'x-auth-token': token },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Function to update a task
export const updateTask = async (id: string, taskData: { title?: string; description?: string; status?: string; dueDate?: Date }) => {
  try {
    const token = getToken();
    const response = await axios.put(`${API_URL}/tasks/${id}`, taskData, {
      headers: { 'x-auth-token': token },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Function to delete a task
export const deleteTask = async (id: string) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${API_URL}/tasks/${id}`, {
      headers: { 'x-auth-token': token },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

reportWebVitals();
