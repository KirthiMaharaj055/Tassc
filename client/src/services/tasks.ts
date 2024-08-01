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

const API_URL = '/tasks';

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const res = await API.get(API_URL);
    return res.data;
  } catch (err) {
    console.error('Error fetching tasks:', err);
    throw err;
  }
};

export const getTasks = async (): Promise<Task[]> => {
  return await fetchTasks();
};

export const createTask = async (taskData: TaskData): Promise<Task> => {
  const response = await API.post(API_URL, taskData);
  return response.data;
};

export const updateTask = async (id: string, taskData: TaskData): Promise<Task> => {
  const response = await API.put(`${API_URL}/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  const response = await API.delete(`${API_URL}/${id}`);
  return response.data;
};
