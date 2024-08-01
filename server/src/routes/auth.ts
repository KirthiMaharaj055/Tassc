import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { registerUser, loginUser } from '../controllers/authController';

const router = express.Router();

// Registration route
router.post(
  '/api/auth/register',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await registerUser(req, res);
  }
);

// Login route
router.post(
  '/api/auth/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await loginUser(req, res);
  }
);

export default router;

