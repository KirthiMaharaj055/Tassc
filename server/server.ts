import express from 'express';
import connectDB from './src/config/ mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import authRoutes from './src/routes/auth';
import taskRoutes from './src/routes/tasks';

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS
app.use(cors());

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });
  }
  
  const PORT = process.env.PORT || 3000;
  
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


  