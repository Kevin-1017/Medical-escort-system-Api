import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  // 用户登录
  @Post()
  findOne(@Body() phoneNumber: string): Promise<User | null> {
    return this.usersService.findOne(phoneNumber);
  }
  // 用户注册
  @Post()
  create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }
}
