import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth';
import '../styles/Auth.css';

const Register: React.FC = () => {
  const [name, setName] = useState<string>(''); 
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await register({ name, email, password });
      if (response) {
        navigate('/login'); // Redirect to login page after successful registration
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Register</h2>
      <form onSubmit={handleRegister} className="auth-form">
        <label>Name</label> 
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />

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
