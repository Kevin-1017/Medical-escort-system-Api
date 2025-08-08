import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ length: 11, nullable: false })
  phoneNumber: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true, default: '默认昵称' })
  name: string;

  @Column({ nullable: true, default: 'user' })
  role: string;

  // 自动设置为当前时间戳
  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ nullable: true, default: true })
  status: boolean;
}
