import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../entities/user.entity';
import { auth_RegisterDto, auth_LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  //用户注册
  async register(dto: auth_RegisterDto): Promise<User> {
    // 简化验证码验证逻辑（示例）
    if (dto.validCode !== '1234') {
      throw new UnauthorizedException('验证码错误');
    }
    const youAreHere = await this.usersService.findOne(dto.phoneNumber);
    // 用户已存在，直接删除该记录
    if (youAreHere) {
      await this.usersService.remove(youAreHere.id);
    }
    // 直接创建 User 实例
    const user = new User();
    user.phoneNumber = dto.phoneNumber;
    user.password = dto.password;

    // 保存用户实体,返回DTO对象
    return await this.usersService.create(user);
  }
  //用户登录
  async login(dto: auth_LoginDto): Promise<User> {
    // 获取用户信息
    const user = await this.usersService.findOne(dto.phoneNumber);
    if (!user) {
      throw new NotFoundException('用户不存在');
    } else if (user.password !== dto.password) {
      // 验证密码
      throw new UnauthorizedException('密码错误');
    } else {
      return user;
    }
  }
}
