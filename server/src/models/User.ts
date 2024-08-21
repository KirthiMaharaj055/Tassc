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

// Pre-save hook to hash the password before saving
// userSchema.pre<IUser>('save', async function (next) {
//   if (this.isModified('password')) {
//     try {
//       const salt = await bcrypt.genSalt(10);    // Create a new user instance
//       this.password = await bcrypt.hash(this.password, salt);
//     } catch (error) {
//       return next(error as any); // Cast error to 'any' to satisfy TypeScript
//     }
//   }
//   next();
// });


// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default model<IUser>('User', userSchema);
