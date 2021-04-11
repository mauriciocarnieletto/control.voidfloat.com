import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async encrypt(password: string) {
    return bcrypt.hash(password, 10);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const users = await this.usersService.find({ where: { email } });
    const user = users[0];
    const hashedPassword = await this.encrypt(pass);
    if (user && user.password === hashedPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      clientId: user.clientId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
