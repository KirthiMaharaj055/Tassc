import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/Auth.css';

// const Register: React.FC = () => {
//   const [name, setName] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/auth/register', { name, email, password });
//       navigate('/login');
//       //navigate('/api/login');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
    
//       <div className="auth-container">
//         <h2 className="auth-title">Register</h2>
//         <form onSubmit={handleSubmit} className="auth-form">

//         <label>Name</label> 
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />

//         <label>Email</label>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="m@example.com" required />
        
//         <label>Password</label>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
        
//         <button type="submit">Register</button>
//         </form>

//         <p>
//           Already have an account? <a href="/login">Login</a>
//         </p>

//       </div>
//   );
// };


const Register: React.FC = () => {
  // Declare state variables
  const [name, setName] = useState<string>(''); // Add the name state
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }), // Include name in request body
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData.message);
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
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

export default Register
