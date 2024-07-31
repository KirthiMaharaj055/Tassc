// import { Schema, model, Document } from 'mongoose';

// interface ITask extends Document {
//   userId: string;
//   title: string;
//   description?: string;
//   status: string;
//   dueDate?: Date;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const TaskSchema: Schema = new Schema({
//   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   title: { type: String, required: true },
//   description: { type: String },
//   status: { type: String, default: 'pending' },
//   dueDate: { type: Date },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// export default model<ITask>('Task', TaskSchema);
import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description?: string;
  status: string;
  dueDate?: Date;
  user: mongoose.Schema.Types.ObjectId;
}

const taskSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'in progress', 'completed'],
  },
  dueDate: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
