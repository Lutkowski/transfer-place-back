import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './postgres/entities/car.entity';
import { CarClassEntity } from './postgres/entities/car-class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity, CarClassEntity])],
})
export class InfrastructureModule {}
