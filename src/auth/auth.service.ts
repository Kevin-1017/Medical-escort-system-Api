// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  private users: any[] = []; // 临时存储用户数据（后续应替换为数据库）

  async register(dto: AuthDto) {
    // 1. 验证用户是否存在
    const userExists = this.users.some((user) => user.email === dto.email);
    if (userExists) {
      throw new Error('User already exists');
    }

    // 2. 加密密码（需安装 bcrypt 或 argon2）
    // const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. 存储用户（后续应保存到数据库）
    const user = { ...dto /*, password: hashedPassword */ };
    this.users.push(user);
    return user;
  }

  async login(dto: AuthDto) {
    // 1. 查找用户
    const user = this.users.find((user) => user.email === dto.email);
    if (!user) {
      throw new Error('User not found');
    }

    // 2. 验证密码（需解密对比）
    // const isValid = await bcrypt.compare(dto.password, user.password);
    // if (!isValid) throw new Error('Invalid credentials');

    // 3. 生成 JWT（需安装 @nestjs/jwt）
    // return this.jwtService.sign({ email: user.email });
    return { token: 'mocked-token' }; // 临时模拟
  }
}
