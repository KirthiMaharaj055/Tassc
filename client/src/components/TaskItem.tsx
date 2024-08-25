import React, { useState } from 'react';
import '../styles/TaskItem.css';

interface TaskItemProps {
  task: {
    _id: string;
    title: string;
    description?: string;
    status: string; // Expecting values like 'Completed' or 'Incomplete'
    dueDate?: Date;
  };
  onUpdateTask: (id: string, updatedTask: { title: string; description: string; status: string; dueDate: Date }) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdateTask, onDelete }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editStatus, setEditStatus] = useState(task.status);
  const [editDueDate, setEditDueDate] = useState(task.dueDate ? new Date(task.dueDate).toISOString().substring(0, 10) : '');

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleEditing = () => setIsEditing(!isEditing);

  const handleSave = () => {
    const updatedTask = {
      title: editTitle,
      description: editDescription,
      status: editStatus,
      dueDate: editDueDate ? new Date(editDueDate) : new Date(),
    };
    onUpdateTask(task._id, updatedTask);
    setIsEditing(false);
  };

  const statusClass = task.status === 'Completed' ? 'status-completed' : 'status-incomplete';

  return (
    <tr className="task-item">
      {isEditing ? (
        <>
          <td>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </td>
          <td>
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              className={statusClass}
            >
              <option value="Completed">Completed</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </td>
          <td>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
            />
          </td>
          <td className="task-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={toggleEditing}>Cancel</button>
          </td>
        </>
      ) : (
        <>
          <td>{task.title}</td>
          <td>{task.description}</td>
          <td className={statusClass}>{task.status}</td>
          <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
          <td className="task-actions">
            <div className="dropdown">
              <button onClick={toggleDropdown}>...</button>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li onClick={toggleEditing}>Edit</li>
                  <li onClick={() => onDelete(task._id)}>Delete</li>
                </ul>
              )}
            </div>
          </td>
        </>
      )}
    </tr>
  );
};

export default TaskItem;
