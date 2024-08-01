import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // Create a new user instance
    user = new User({
      name,
      email,
      password
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();

    // Create a payload for the JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    // Sign the JWT and send it to the client
    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error((err as Error).message);
        return res.status(500).send('Server error');
      }
      res.json({ token });
    });
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    // Create a payload for the JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    // Sign the JWT and send it to the client
    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error((err as Error).message);
        return res.status(500).send('Server error');
      }
      res.json({ token });
    });
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};

