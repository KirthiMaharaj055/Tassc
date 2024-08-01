import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import '../styles/Auth.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password });
      navigate('/tasks'); // Redirect to tasks page after successful login
    } catch (error) {
      console.error('An error occurred during login:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <p>Enter your email below to login to your account</p>
      <form onSubmit={handleLogin}>
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
