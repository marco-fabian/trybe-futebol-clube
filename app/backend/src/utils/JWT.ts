import * as jwt from 'jsonwebtoken';

export default class Jwt {
  static generateToken(data: Record<string, unknown> | string) {
    return jwt.sign(data, process.env.JWT_SECRET || 'ft');
  }

  static testToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET || 'ft');
  }
}
