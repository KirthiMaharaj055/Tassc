import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt'; // Ensure bcrypt is installed and imported correctly


// Define the TypeScript interface for User
interface IUser extends Document {
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the User schema
const userSchema = new Schema<IUser>({
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

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default model<IUser>('User', userSchema);
