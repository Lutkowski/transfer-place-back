import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CarClassEntity } from './car-class.entity';

@Entity('cars')
export class CarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CarClassEntity, (carClass) => carClass.cars)
  @JoinColumn({ name: 'car_class_id' })
  carClass: CarClassEntity;

  @Column()
  title: string;

  @Column({ type: 'int', default: 3 })
  placeNumber: number;

  @Column({ nullable: true })
  imgSrc: string;

  @Column({ nullable: true })
  imgAlt: string;
}
