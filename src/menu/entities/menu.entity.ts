import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  path: string;

  @Column({ nullable: false })
  icon: string;

  @Column({ nullable: true })
  parent_id: number;

  @ManyToMany(() => Role, (role) => role.menu)
  role: Role[];
}
