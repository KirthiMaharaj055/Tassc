import axios from 'axios';
import API from './api'; // Assuming you have a configured Axios instance

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

// Function to fetch tasks from the API
export const fetchTasks = async (): Promise<Task[]> => {
  try {
    //const res = await API.get('/tasks');
    const res = await axios.get('/api/tasks');
    return res.data;
  } catch (err) {
    console.error('Error fetching tasks:', err);
    throw err;
  }
};

// Other API functions
export const getTasks = async (): Promise<Task[]> => {
  return await fetchTasks();
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
