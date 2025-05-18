import { CarsService } from '../../core/services/cars.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCarDto } from '../../shared/dto/create-car.dto';
import { CarEntity } from '../../infra/postgres/entities/car.entity';
import { GetCarDto } from '../../shared/dto/get-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  async createCar(@Body() dto: CreateCarDto): Promise<CarEntity> {
    return this.carsService.createCar(dto);
  }

  @Get()
  async getAllCars(): Promise<GetCarDto[]> {
    return this.carsService.getAllCars();
  }
}
