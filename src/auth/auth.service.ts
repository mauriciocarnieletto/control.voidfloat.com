import { Injectable, UnauthorizedException } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
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
    return hash(password, 10).toString();
  }

  async validateUser(email: string, pass: string): Promise<User | null> {
    const users = await this.usersService.find({ where: { email } });
    const user = users[0];
    if (user && compare(pass, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException();
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
