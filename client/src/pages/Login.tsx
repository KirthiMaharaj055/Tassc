import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import '../styles/Auth.css';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email); // Log email
    console.log("Password:", password); // Log password
    
    try {
      await login({ email, password });
      navigate('/tasks'); // Redirect to tasks page after successful login
    // } catch (error) {
    //   console.error('An error occurred during login:', error);
    //   alert('Login failed. Please check your credentials and try again.');
    // }
    }catch (error: unknown) { // Ensure error is of unknown type, which is safe in TypeScript
      if (axios.isAxiosError(error)) { // Use axios's built-in type guard
        if (error.response && error.response.data && Array.isArray(error.response.data.errors)) {
          console.error('Login failed:', error.response.data.errors);
          alert('Login failed: ' + error.response.data.errors.map((e: any) => e.msg).join(', '));
        } else {
          console.error('Unexpected error during login:', error);
          alert('Login failed due to an unexpected error. Please try again.');
        }
      } else {
        console.error('An unexpected error occurred:', error);
        alert('An unexpected error occurred. Please try again.');
      }
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
