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

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');

  const fetchTasks = async () => {
    try {
      const tasks = await getTasks();
      console.log('Fetched tasks:', tasks); // Log tasks to verify structure
      setTasks(tasks);
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

  const handleUpdateTask = async (taskId: string, status: string) => {
    try {
      const task = tasks.find(t => t._id === taskId);
      if (task) {
        const updatedTask = { ...task, status };
        await updateTask(taskId, updatedTask);
        fetchTasks(); // Refresh task list after update
      }
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    }
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
    <div>
      
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
              <th>Task Name</th>
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
                onUpdateStatus={(taskId, status) => handleUpdateTask(taskId, status)} 
                onDelete={handleDeleteTask} 
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskManager;
