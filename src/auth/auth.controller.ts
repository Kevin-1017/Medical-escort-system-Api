import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service'; // 导入服务
import { auth_RegisterDto, auth_LoginDto } from './dto/auth.dto'; // 后续需要定义的 DTO
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {} // 注入服务

  @Post('register')
  register(@Body() dto: auth_RegisterDto): Promise<User> {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: auth_LoginDto): Promise<User> {
    return this.authService.login(dto);
  }
}
