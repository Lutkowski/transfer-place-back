import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarEntity } from '../../infra/postgres/entities/car.entity';
import { Repository } from 'typeorm';
import { CreateCarDto } from '../../shared/dto/create-car.dto';
import { GetCarDto } from '../../shared/dto/get-car.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
  ) {}

  async createCar(dto: CreateCarDto): Promise<CarEntity> {
    const car = this.carRepository.create({
      ...dto,
      carClass: { id: dto.carClassId },
    });
    return this.carRepository.save(car);
  }

  async getAllCars(): Promise<GetCarDto[]> {
    const cars = await this.carRepository.find({ relations: ['carClass'] });

    return cars.map((car) => ({
      ...car,
      carClass: car.carClass.name,
    }));
  }
}
