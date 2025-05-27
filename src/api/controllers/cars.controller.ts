import { CarsService } from '../../core/services/cars.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCarDto } from '../../shared/dto/create-car.dto';
import { CarEntity } from '../../infra/postgres/entities/car.entity';
import { GetCarDto } from '../../shared/dto/get-car.dto';
import { UpdateCarDto } from '../../shared/dto/update-car,dto';

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

  @Patch(':id')
  updateCar(
    @Param('id') id: number,
    @Body() dto: UpdateCarDto,
  ): Promise<CarEntity> {
    return this.carsService.updateCar(id, dto);
  }

  @Delete(':id')
  async deleteCar(@Param('id') id: string) {
    return this.carsService.deleteCar(+id);
  }

  @Get('excel')
  async exportCarsToExcel(): Promise<{ url: string }> {
    return this.carsService.exportCarsToExcel();
  }
}
