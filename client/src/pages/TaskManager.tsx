import React, { useState, useEffect } from 'react';
import TaskItem from '../components/TaskItem';
import { getTasks, createTask, updateTask, deleteTask } from '../services/tasks';
import '../styles/TaskManager.css';

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: string;
  dueDate?: Date;
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      alert('Failed to fetch tasks');
    }
  };

  const handleCreateTask = async () => {
    if (!newTask) return; // Validate newTask input
    const taskData = { title: newTask, description: newDescription, status: 'pending' };
    try {
      await createTask(taskData);
      fetchTasks(); // Refresh task list after creation
      setNewTask(''); // Clear input field
      setNewDescription(''); // Clear input field
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    }
  };

  const handleUpdateTask = (id: string, updatedTask: { title: string; description: string; dueDate: Date }) => {
    const updatedTasks = tasks.map(task =>
      task._id === id ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      fetchTasks(); // Refresh task list after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-manager-container">
      <h2>Tasks</h2>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Task Name"
        />
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Description"
        />
        <button onClick={handleCreateTask}>Add Task</button>
      </div>
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onUpdateTask={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskManager;
