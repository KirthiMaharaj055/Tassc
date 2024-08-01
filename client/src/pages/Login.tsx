import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import '../styles/Auth.css';

// const Login: React.FC = () => {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await login({ email, password });
//       navigate('/tasks');
//       //navigate('/api/tasks'); 
//     } catch (error) {
//       console.error('Login error:', error);
//       alert('Login failed');
//     }    
//   };

//   return (
//     <div className="auth-container">
//       <h2>Login</h2>
//       <p>Enter your email below to login to your account</p>
//      <form onSubmit={handleSubmit}>
//         <label>Email</label>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="m@example.com" required />
        
//         <label>Password</label>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
//         <div className="auth-options">
//           <a href="#">Forgot your password?</a>
//         </div>
        
//         <button type="submit">Login</button>
        
//       </form>
//       <p>
//         Don't have an account? <a href="/register">Sign up</a>
//       </p>
//     </div>
//   );
// };

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Assuming successful login redirects to a dashboard
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        // Handle login error (e.g., show an error message)
        console.error('Login failed:', errorData.message);
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
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
