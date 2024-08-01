import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const connectDB = async () => {
    try {
      const uri = process.env.MONGO_URI;
      if (!uri) {
        throw new Error('MongoDB URI is not defined in the environment variables');
      }
      console.log('MongoDB URI:', uri); // Log the URI to verify it is loaded
      await mongoose.connect(uri);
      console.log('MongoDB connected');
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
      } else {
        console.error('An unknown error occurred while connecting to MongoDB');
      }
      process.exit(1); // Exit process with failure
    }
  };

export default connectDB;
