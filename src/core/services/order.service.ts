import { OrderEntity } from '../../infra/postgres/entities/order.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../infra/postgres/entities/user.entity';
import { CarClassEntity } from '../../infra/postgres/entities/car-class.entity';
import { DestinationEntity } from '../../infra/postgres/entities/destination.entity';
import { CreateOrderDto } from '../../shared/dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(CarClassEntity)
    private readonly classRepo: Repository<CarClassEntity>,
    @InjectRepository(DestinationEntity)
    private readonly destRepo: Repository<DestinationEntity>,
  ) {}

  async create(userId: number, dto: CreateOrderDto): Promise<OrderEntity> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`Юзер с id ${userId} не найден`);

    const carClass = await this.classRepo.findOne({
      where: { name: dto.carClass },
    });
    if (!carClass)
      throw new NotFoundException(`Класс машины ${carClass} не найден`);

    const destination = await this.destRepo.findOne({
      where: { name: dto.transferType },
    });
    if (!destination)
      throw new NotFoundException(`Тип трансфера ${destination} не найден`);

    const order = this.orderRepo.create({
      user,
      carClass,
      destination,
      comment: dto.comment,
      withChild: dto.withChild ?? false,
      withSign: dto.withSign ?? false,
      hoursQuantity: dto.hoursQuantity,
    });
    return this.orderRepo.save(order);
  }

  findAll(): Promise<OrderEntity[]> {
    return this.orderRepo.find({
      relations: ['user', 'carClass', 'destination'],
    });
  }

  async findOne(id: number): Promise<OrderEntity> {
    const order = await this.orderRepo.findOne({
      where: { id: id },
      relations: ['user', 'carClass', 'destination'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
