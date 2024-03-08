import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  async hashcontrasena(contrasena: string): Promise<string> {
    return bcrypt.hash(contrasena, 15);
  }

  async comparecontrasena(plaincontrasena: string, hashedcontrasena: string): Promise<boolean> {
    return bcrypt.compare(plaincontrasena, hashedcontrasena);
  }
}
