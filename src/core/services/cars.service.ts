import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarEntity } from '../../infra/postgres/entities/car.entity';
import { Repository } from 'typeorm';
import { CreateCarDto } from '../../shared/dto/create-car.dto';
import { GetCarDto } from '../../shared/dto/get-car.dto';
import { UpdateCarDto } from '../../shared/dto/update-car,dto';

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

  async updateCar(id: number, dto: UpdateCarDto): Promise<CarEntity> {
    const car = await this.carRepository.findOne({ where: { id } });
    if (!car) {
      throw new Error(`Машина с id=${id} не найдена`);
    }

    if (dto.carClassId) {
      Object.assign(car, { ...dto, carClass: { id: dto.carClassId } });
    } else {
      Object.assign(car, dto);
    }

    return this.carRepository.save(car);
  }

  async deleteCar(id: number): Promise<{ message: string }> {
    const result = await this.carRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Машина не найдена');
    }
    return { message: 'Машина успешно удалена' };
  }
}
