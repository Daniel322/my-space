import jwt, { JwtPayload } from 'jsonwebtoken';

export class JwtService {
  static accessSecret: string;
  static accessTtl: string;

  static async init(jwtSecret: string, jwtTttl: string) {
    this.accessSecret = jwtSecret as string;
    this.accessTtl = jwtTttl as string;
  }

  // TODO: add data types and ttl after adding refresh token
  static async sign(data: unknown): Promise<string> {
    // return jwt.sign({ user: data }, this.accessSecret, { expiresIn: `${this.accessTtl}m` })
    return jwt.sign({ user: data }, this.accessSecret);
  }

  static async verify(token: string): Promise<JwtPayload | string> {
    return jwt.verify(token, this.accessSecret);
  }
}