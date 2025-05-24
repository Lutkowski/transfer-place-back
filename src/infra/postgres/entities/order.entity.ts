import { CarClassEntity } from './car-class.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { DestinationEntity } from './destination.entity';
import { OrderStatus } from '../../../shared/enums/order-status.enum';

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

  @Column({ nullable: true })
  comment?: string;

  @Column({ type: 'boolean', default: false })
  withChild: boolean;

  @Column({ type: 'boolean', default: false })
  withSign: boolean;

  @Column({ type: 'int', nullable: true })
  hoursQuantity?: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.NEW })
  status: OrderStatus;

  @CreateDateColumn()
  createdAt: Date;
}
