import { Schema, model, Document } from 'mongoose';

// Define the Task schema
const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true } // Ensure this field is present
}, {
  timestamps: true,
});

// Define the TypeScript interface for Task
interface ITask extends Document {
  title: string;
  description: string;
  completed: boolean;
  user: Schema.Types.ObjectId; // Use ObjectId type here
}

export default model<ITask>('Task', taskSchema);
