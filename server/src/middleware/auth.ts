import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  //const token = req.header('x-auth-token');
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  console.log('Received token:', token); // Debugging: Log the token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'C69xQiqIoXJf+lnducvupwJVTEAg8m2wfUlPwB3Hou4=') as {
      user: {
        id: string;
      };
    };
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default auth;
