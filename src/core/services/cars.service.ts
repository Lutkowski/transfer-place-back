import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarEntity } from '../../infra/postgres/entities/car.entity';
import { Repository } from 'typeorm';
import { CreateCarDto } from '../../shared/dto/create-car.dto';
import { GetCarDto } from '../../shared/dto/get-car.dto';
import { UpdateCarDto } from '../../shared/dto/update-car,dto';
import { MinioService } from './minio.service.';
import * as ExcelJS from 'exceljs';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
    private readonly minioService: MinioService,
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

  async exportCarsToExcel(): Promise<{ url: string }> {
    const cars = await this.carRepository.find({ relations: ['carClass'] });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Cars');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Название', key: 'title', width: 30 },
      { header: 'Мест', key: 'placeNumber', width: 10 },
      { header: 'Класс', key: 'carClass', width: 20 },
      { header: 'Картинка (src)', key: 'imgSrc', width: 40 },
      { header: 'Alt', key: 'imgAlt', width: 30 },
    ];

    cars.forEach((car) => {
      worksheet.addRow({
        id: car.id,
        title: car.title,
        placeNumber: car.placeNumber,
        carClass: car.carClass?.name,
        imgSrc: car.imgSrc,
        imgAlt: car.imgAlt,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    const filename = `cars.xlsx`;

    const fakeFile = {
      originalname: filename,
      buffer: buffer,
    } as Express.Multer.File;

    const url = `http://localhost:9000/cars-images/${await this.minioService.uploadFile('cars-images', fakeFile)}`;
    return { url };
  }
}
