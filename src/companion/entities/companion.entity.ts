// src/companion/companion.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Companion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 11 })
  mobile: string;
  // 是否生效
  @Column()
  active: boolean;

  @Column('int')
  age: number;
  // 头像
  @Column({ type: 'varchar' })
  avatar: string;

  @Column({ type: 'varchar' })
  name: string;
  // 1是男，2是女
  @Column({ type: 'varchar' })
  sex: string;
}
