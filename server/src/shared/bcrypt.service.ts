import bcrypt from "bcryptjs";

export class BcryptService {
  static async hash(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(data, salt);

    return hash;
  }
  
  static compare(originalString: string, hashedString: string): Promise<boolean> {
    return bcrypt.compare(originalString, hashedString);
  }
}