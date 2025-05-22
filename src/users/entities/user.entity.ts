import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ length: 11, nullable: false })
  phoneNumber: string;

  @Column({ nullable: false })
  password: string;
}
