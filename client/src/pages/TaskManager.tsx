import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
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

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      setTasks(tasks);
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTask.trim() === '') return;
    const task = await createTask({ title: newTask, description: newDescription, status: 'pending' });
    setTasks([...tasks, task]);
    setNewTask('');
    setNewDescription('');
  };

  const handleUpdateTask = async (id: string, status: string) => {
    const updatedTask = await updateTask(id, { status });
    setTasks(tasks.map(task => (task._id === id ? updatedTask : task)));
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div>
      <Navbar />
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
          <button onClick={handleAddTask}>Add Task</button>
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
              <TaskItem key={task._id} task={task} onUpdateStatus={handleUpdateTask} onDelete={handleDeleteTask} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskManager;