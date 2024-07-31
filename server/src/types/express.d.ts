import { User } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: User; // or use an appropriate type for user if needed
    }
  }
}
