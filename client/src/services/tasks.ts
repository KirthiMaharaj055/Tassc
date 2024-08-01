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

const API_URL = '/api/tasks'; 

// // Function to fetch tasks from the API
// export const fetchTasks = async (): Promise<Task[]> => {
//   try {
//     //const res = await API.get('/tasks');
//     const res = await axios.get(API_URL);
//     return res.data;
//   } catch (err) {
//     console.error('Error fetching tasks:', err);
//     throw err;
//   }
// };

// Function to fetch tasks from the API
export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const res = await axios.get(API_URL);
    // Ensure the response data is an array
    return Array.isArray(res.data) ? res.data : [];
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
  const response = await axios.post(API_URL, taskData);
  return response.data;
};

export const updateTask = async (id: string, taskData: TaskData): Promise<Task> => {
  const response = await axios.put(`${API_URL}/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

