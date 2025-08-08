import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import {
  PaginationDto,
  paginate,
  PaginatedResponse,
} from '../utils/pagination';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 用户列表
  async findForPage(
    pagination: PaginationDto,
  ): Promise<PaginatedResponse<User>> {
    return await paginate(this.usersRepository, pagination);
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
  // 更新用户信息
  async update(id: number, user: Partial<User>): Promise<UpdateResult> {
    return this.usersRepository.update(id, user);
  }
}
