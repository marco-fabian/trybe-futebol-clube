import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../Interfaces/User';

export default class Validation {
  private static passwordMinLength = 6;
  private static emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  static validation(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body as ILogin;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!Validation.emailRegex.test(email) || password.length < Validation.passwordMinLength) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}
