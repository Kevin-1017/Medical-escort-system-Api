// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service'; // 导入服务
import { AuthDto } from './dto/auth.dto'; // 后续需要定义的 DTO

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {} // 注入服务

  @Post('register')
  register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
