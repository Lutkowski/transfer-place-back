import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CarEntity } from './car.entity';

@Entity('car_classes')
export class CarClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => CarEntity, (car) => car.carClass)
  cars: CarEntity[];
}
