import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Menu } from '../../menu/entities/menu.entity';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Menu, (menu) => menu.role)
  // 在 TypeORM 中，多对多关系必须在一方（且仅一方）使用 @JoinTable()，否则会报错
  @JoinTable({
    name: 'role_menu',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'menu_id',
      referencedColumnName: 'id',
    },
  })
  menu: Menu[];
}
