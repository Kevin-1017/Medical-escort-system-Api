import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
// import { Injectable, Inject } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from './user.entity';
// import { AuthDto } from './dto/auth.dto';

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//   ) {}

//   async register(dto: AuthDto) {
//     const userExists = await this.usersRepository.findOne({ where: { email: dto.email } });
//     if (userExists) {
//       throw new Error('User already exists');
//     }

//     const newUser = this.usersRepository.create(dto);
//     return this.usersRepository.save(newUser);
//   }

//   async login(dto: AuthDto) {
//     const user = await this.usersRepository.findOne({ where: { email: dto.email } });
//     if (!user) {
//       throw new Error('User not found');
//     }

//     // 这里需要加入密码验证逻辑...

//     return { token: 'mocked-token' }; // 应该替换为实际的 JWT 生成逻辑
//   }
// }
