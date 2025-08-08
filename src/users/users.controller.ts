import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
  Query,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { PaginationDto } from '../utils/pagination';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('list')
  async findForPage(@Query() pagination: PaginationDto) {
    return this.usersService.findForPage(pagination);
  }
  // 用户登录
  @Post()
  findOne(@Body() phoneNumber: string): Promise<User | null> {
    return this.usersService.findOne(phoneNumber);
  }
  // 用户注册
  @Post('create')
  create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }
  // 删除用户
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }

  // 更新用户信息
  @UseGuards(AuthGuard)
  @Put('/update/:id')
  update(@Param('id') id: number, @Body() user: Partial<User>) {
    return this.usersService.update(id, user);
  }
}
