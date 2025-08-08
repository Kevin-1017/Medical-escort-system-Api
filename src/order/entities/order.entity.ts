import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'hospital_id' })
  hospitalId: string;

  @Column({ type: 'varchar', name: 'hospital_name' })
  hospitalName: string;

  @Column({ type: 'varchar', name: 'receive_address' })
  receiveAddress: string;

  @Column({ type: 'varchar' })
  tel: string;

  @Column({ type: 'bigint' })
  starttime: number;

  @Column({ type: 'text' })
  demand: string;

  @Column({ type: 'integer', name: 'companion_id' })
  companionId: number;

  @Column({ type: 'varchar', default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
