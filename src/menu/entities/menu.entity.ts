import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column({ default: false })
  disabled: boolean;

  @Column({ type: 'int', nullable: true })
  parentId: number | null;

  @ManyToOne(() => Menu, (menu) => menu.children)
  @JoinColumn({ name: 'parent_id' })
  parent: Menu;

  @OneToMany(() => Menu, (menu) => menu.parent)
  children: Menu[];

  @ManyToMany(() => Role, (role) => role.menus)
  roles: Role[];
}
