import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/Auth.css';

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { name, email, password });
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
      <div className="auth-container">
        <h2 className="auth-title">Register</h2>
        <form onSubmit={handleSubmit} className="auth-form">

        <label>Name</label> 
        <input type="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="m@example.com" required />
        
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
        
        <button type="submit">Register</button>
        </form>

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>

      </div>
  );
};

export default Register;
