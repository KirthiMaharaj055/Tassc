import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'C69xQiqIoXJf+lnducvupwJVTEAg8m2wfUlPwB3Hou4=';

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // Hash the password before saving 
    const salt = await bcrypt.genSalt(10);    // Create a new user instance
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Hashed Password:', hashedPassword); // Log to see what gets stored
 
    // Create a new user instance
    user = new User({
      name,
      email,
      password: hashedPassword, // Store the hashed password
    });

    // Save the user to the database
    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign the JWT and return it to the client
    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
      }
      return res.json({ token });
    });
  } catch (err) {
    console.error((err as Error).message);
    return res.status(500).send('Server error');
  }
};


export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Comparing password:', password, 'with hash:', user.password, 'Result:', isMatch);
    if (!isMatch) {
      console.log("Password mismatch for email:", email); // Log if password does not match
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    console.log("User authenticated:", email); // Log if user is authenticated
    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign the JWT and return it to the client
    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error(err.message);
        console.error("JWT Error:", err.message);
        return res.status(500).send('Server error'); // Ensure function exits here
      }
      return res.json({ token }); // Use return to prevent further execution
    });
  } catch (err) {
   // console.error((err as Error).message);
    console.error("Login error:", (err as Error).message);
    return res.status(500).send('Server error'); // Use return to prevent further execution
  }
};


// bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
//   if (result) {
//     console.log('Password matches');
//   } else {
//     console.log('Password does not match');
//   }
// });