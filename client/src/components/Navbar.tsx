import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/tasks">Task Manager</Link>
      </div>
      <div className="navbar-links">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar
