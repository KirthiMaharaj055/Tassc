// import mongoose, { Document, Schema } from 'mongoose';

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   // Add other user properties as needed
// }

// const UserSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   // Add other user properties as needed
// });

// const User = mongoose.model<IUser>('User', UserSchema);

// export default User;


import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt'; // Ensure bcrypt is installed and imported correctly

// Define the User schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Pre-save hook to hash the password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    } catch (error) {
      return next(error as any); // Cast error to 'any' to satisfy TypeScript
    }
  }
  next();
});

// Define the TypeScript interface for User
interface IUser extends Document {
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default model<IUser>('User', userSchema);

