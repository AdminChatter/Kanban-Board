import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the Authorization header (Bearer token)
  const token = req.headers['authorization']?.split(' ')[1]; // Assuming 'Authorization: Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    // Attach the user data (from JWT payload) to the request object
    req.user = (decoded as JwtPayload).username;

    // Proceed to the next middleware or route handler
    return next();
  });
};
