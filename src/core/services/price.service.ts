import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CarClassPriceEntity } from '../../infra/postgres/entities/car-class-price.entity';
import { CarClassEntity } from '../../infra/postgres/entities/car-class.entity';
import { DestinationEntity } from '../../infra/postgres/entities/destination.entity';
import { CalculatePriceDto } from '../../shared/dto/calculate-price.dto';
import { TransferType } from '../../shared/enums/transfer-type.enum';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(CarClassPriceEntity)
    private readonly priceRepo: Repository<CarClassPriceEntity>,
    @InjectRepository(CarClassEntity)
    private readonly classRepo: Repository<CarClassEntity>,
    @InjectRepository(DestinationEntity)
    private readonly destRepo: Repository<DestinationEntity>,
  ) {}

  async calculatePrice(dto: CalculatePriceDto): Promise<{ price: number }> {
    const carClass = await this.classRepo.findOneBy({ name: dto.carClass });
    if (!carClass) {
      throw new NotFoundException(`Класс машины "${dto.carClass}" не найден`);
    }

    const destination = await this.destRepo.findOneBy({
      name: dto.destination,
    });
    if (!destination) {
      throw new NotFoundException(
        `Тип трансфера "${dto.destination}" не найден`,
      );
    }

    const baseRecord = await this.priceRepo
      .createQueryBuilder('price')
      .leftJoinAndSelect('price.carClass', 'carClass')
      .leftJoinAndSelect('price.destination', 'destination')
      .where('carClass.id = :carClassId', { carClassId: carClass.id })
      .andWhere('destination.id = :destinationId', {
        destinationId: destination.id,
      })
      .getOne();

    if (!baseRecord) {
      throw new NotFoundException(
        `Цена с условиями: "${dto.carClass}", "${dto.destination} не найдена"`,
      );
    }

    let total = baseRecord.price;

    if (dto.destination === TransferType.RENT_WITH_DRIVER) {
      const hours = dto.hoursQuantity ?? 0;
      if (hours <= 0) {
        throw new NotFoundException(
          `Количество часов должно быть передано для аренды с водителем`,
        );
      }
      total *= hours;
    }

    if (dto.withChild) total += 300;
    if (dto.withSign) total += 500;

    return { price: total };
  }

  async getAllPrices() {
    const prices = await this.priceRepo.find({
      relations: ['carClass', 'destination'],
      order: {
        carClass: { id: 'ASC' },
        destination: { id: 'ASC' },
      },
    });

    return prices.map((p) => ({
      id: p.id,
      price: p.price,
      carClass: {
        id: p.carClass.id,
        name: p.carClass.name,
      },
      destination: {
        id: p.destination.id,
        name: p.destination.name,
      },
    }));
  }
}
