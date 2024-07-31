import express from 'express';
import connectDB from './src/config/ mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

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
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/tasks', require('./routes/api/tasks'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
