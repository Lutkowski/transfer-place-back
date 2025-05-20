import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CarClassPriceEntity } from './car-class-price.entity';

@Entity('destinations')
export class DestinationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => CarClassPriceEntity, (price) => price.destination)
  prices: CarClassPriceEntity[];
}
