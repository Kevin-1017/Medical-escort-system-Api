import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('companion')
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
  @Column({ type: 'varchar', default: '' })
  avatar: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  sex: string;

  // 自动设置为当前时间戳
  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;
}
