import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  // 用户登录
  findOne(phoneNumber: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ phoneNumber });
  }
  // 用户注册
  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
  // 用户删除
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
