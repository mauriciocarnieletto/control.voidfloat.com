import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('/login')
  async login(@Body() loginData: { email: string; password: string }) {
    return this.authService.login(loginData);
  }

  @Post('/signup')
  async signUp(@Body() user: CreateUserDto) {
    const createdUser = await this.usersService.create(user);
    return this.authService.login({
      email: createdUser.email,
      password: user.password,
    });
  }
}
