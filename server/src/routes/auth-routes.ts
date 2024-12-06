import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // 1. Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // 2. Compare the password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // 3. Generate a JWT token
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET as string, // Ensure this environment variable is set
      { expiresIn: '1h' } // You can adjust the expiration time
    );

    // 4. Send the token back to the user
    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
