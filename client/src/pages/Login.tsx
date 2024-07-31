import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import '../styles/Auth.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const nagivate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      nagivate('/tasks');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <p>Enter your email below to login to your account</p>
     <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="m@example.com" required />
        
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        <div className="auth-options">
          <a href="#">Forgot your password?</a>
        </div>
        
        <button type="submit">Login</button>
        
      </form>
      <p>
        Don't have an account? <a href="/register">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
