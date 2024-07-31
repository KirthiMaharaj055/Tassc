import React from 'react';
import '../styles/TaskItem.css';

interface TaskItemProps {
  task: {
    _id: string;
    title: string;
    description?: string;
    status: string;
    dueDate?: Date;
  };
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdateStatus, onDelete }) => {
  return (
    <tr className={`task-item ${task.status}`}>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{task.status}</td>
      <td>{task.dueDate?.toLocaleDateString()}</td>
      <td className="task-actions">
        <button onClick={() => onUpdateStatus(task._id, task.status === 'pending' ? 'completed' : 'pending')}>
          {task.status === 'pending' ? 'Complete' : 'Undo'}
        </button>
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </td>
    </tr>
  );
};

export default TaskItem;
