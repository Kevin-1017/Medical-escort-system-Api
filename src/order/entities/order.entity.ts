import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hospital_id: number;

  @Column({ type: 'varchar', name: 'hospital_name' })
  hospital_name: string;

  @Column({ type: 'varchar', name: 'receive_address' })
  receiveAddress: string;

  @Column({ type: 'varchar' })
  tel: string;

  @Column()
  start_time: string;

  @Column({ type: 'text' })
  demand: string;

  @Column({ type: 'integer', name: 'companion_id' })
  companion_id: number;

  @Column({ type: 'varchar' })
  companion_name: string;

  @Column({ type: 'varchar', default: 'pending' })
  order_status: string;

  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;
}
