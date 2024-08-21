import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/ mongodb';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';

// dotenv.config();  // Ensure this is at the top
// dotenv.config({ path: '/Users/kirthimaharaj/git/Tassc/server/.env' });

// console.log(process.env);


// console.log('Loaded environment variables:', {
//   MONGO_URI: process.env.MONGO_URI,
//   PORT: process.env.PORT,
//   JWT_SECRET: process.env.JWT_SECRET,
// });

// const app = express();

// const PORT = process.env.PORT || 5001;

// // Connect Database
// connectDB();

// // Init Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));


// app.get('/', (req, res) => res.send('API Running'));

// // Define Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);

// // Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../../client/build')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
//   });
// }

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


dotenv.config();  // Ensure this is at the top
dotenv.config({ path: '/Users/kirthimaharaj/git/Tassc/server/.env' });

console.log(process.env);

console.log('Loaded environment variables:', {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
});

const app = express();

const PORT = process.env.PORT || 5001;

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true, // If you need to send cookies or HTTP authentication headers
}));

app.options('*', cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));


app.get('/', (req, res) => res.send('API Running'));

// app.post('/api/auth/register', (req, res) => {
//   // Your registration logic here
//   res.send('Register endpoint');
// });

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

