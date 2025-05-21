import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './postgres/entities/car.entity';
import { CarClassEntity } from './postgres/entities/car-class.entity';
import { CarClassPriceEntity } from './postgres/entities/car-class-price.entity';
import { DestinationEntity } from './postgres/entities/destination.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CarEntity,
      CarClassEntity,
      CarClassPriceEntity,
      DestinationEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class InfrastructureModule {}
