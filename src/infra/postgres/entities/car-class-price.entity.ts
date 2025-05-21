import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CarClassEntity } from './car-class.entity';
import { DestinationEntity } from './destination.entity';

@Entity('car_class_prices')
export class CarClassPriceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CarClassEntity)
  @JoinColumn({ name: 'car_class_id' })
  carClass: CarClassEntity;

  @ManyToOne(() => DestinationEntity)
  @JoinColumn({ name: 'destination_id' })
  destination: DestinationEntity;

  @Column()
  price: number;
}
