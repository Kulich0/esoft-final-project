require('dotenv').config();
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  personal?: {
    id: number;
    email: string;
    roles: string[];
  }; 
}

const authorizeRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const personal_token = req.headers.authorization?.split(' ')[1];

    if (!personal_token) {
      return res.status(401).json({ message: 'No authorization header provided' });
    }

    jwt.verify(personal_token, process.env.JWT_ACCESS_SECRET as string, (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }

      const decodedPersonal = decodedToken as { id: number; email: string; roles: string[] };
      req.personal = decodedPersonal;

      const personalRoles = req.personal?.roles || [];
      const hasRole = roles.some(role => personalRoles.includes(role));

      if (!hasRole) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    });
  };
};

export default authorizeRole;
