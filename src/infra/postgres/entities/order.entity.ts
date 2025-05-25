import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from '../../../shared/enums/order-status.enum';
import { UserEntity } from './user.entity';
import { CarClassEntity } from './car-class.entity';
import { DestinationEntity } from './destination.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CarClassEntity, { nullable: false })
  @JoinColumn({ name: 'car_class_id' })
  carClass: CarClassEntity;

  @ManyToOne(() => DestinationEntity, { nullable: false })
  @JoinColumn({ name: 'destination_id' })
  destination: DestinationEntity;

  @Column({ type: 'boolean', default: false })
  withChild: boolean;

  @Column({ type: 'boolean', default: false })
  withSign: boolean;

  @Column({ type: 'int', nullable: true })
  hoursQuantity?: number;

  @Column({ nullable: true })
  pickupLocation?: string;

  @Column({ nullable: true })
  dropoffLocation?: string;

  @Column({ type: 'date', nullable: true })
  pickupDate?: string;

  @Column({ type: 'time', nullable: true })
  pickupTime?: string;

  @Column({ nullable: true })
  comment?: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.NEW })
  status: OrderStatus;

  @Column({ type: 'int', nullable: true })
  price?: number;

  @CreateDateColumn()
  createdAt: Date;
}
