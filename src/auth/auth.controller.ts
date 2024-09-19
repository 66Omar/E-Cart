import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user-dto';
import { AppResponse } from 'src/common/app-response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const data = await this.authService.createUser(createUserDto);
    return AppResponse('User created successfully', data);
  }

  @Post('login/')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const data = await this.authService.loginUser(loginUserDto);
    return AppResponse('Logged in successfully', data);
  }
}
