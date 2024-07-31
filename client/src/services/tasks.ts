import axios from 'axios';
import API from './api';

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: string;
  dueDate?: Date;
}

interface TaskData {
  title?: string;
  description?: string;
  status?: string;
  dueDate?: Date;
}

export const getTasks = async (): Promise<Task[]> => {
  const res = await API.get('/tasks');
  return res.data;
};

export const createTask = async (taskData: TaskData): Promise<Task> => {
  const res = await API.post('/tasks', taskData);
  return res.data;
};

export const updateTask = async (id: string, taskData: TaskData): Promise<Task> => {
  const res = await API.put(`/tasks/${id}`, taskData);
  return res.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await API.delete(`/tasks/${id}`);
};

const fetchTasks = async () => {
  try {
    const res = await axios.get('/api/tasks');
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};

fetchTasks();
