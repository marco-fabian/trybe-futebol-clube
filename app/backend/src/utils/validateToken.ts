// import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
// import { verifyToken } from '../auth/authFunctions';

const validationToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const data = authorization.split(' ');

  if (!data[1]) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
};

export default validationToken;
