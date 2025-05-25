import { OrderEntity } from '../../infra/postgres/entities/order.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../infra/postgres/entities/user.entity';
import { CarClassEntity } from '../../infra/postgres/entities/car-class.entity';
import { DestinationEntity } from '../../infra/postgres/entities/destination.entity';
import { CreateOrderDto } from '../../shared/dto/create-order.dto';
import { UpdateOrderDto } from '../../shared/dto/update-order.dto';
import { PriceService } from './price.service';

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
    @Inject()
    private readonly priceService: PriceService,
  ) {}

  async create(userId: number, dto: CreateOrderDto): Promise<OrderEntity> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`Юзер с id ${userId} не найден`);

    const carClass = await this.classRepo.findOne({
      where: { name: dto.carClass },
    });
    if (!carClass)
      throw new NotFoundException(`Класс машины ${dto.carClass} не найден`);

    const destination = await this.destRepo.findOne({
      where: { name: dto.transferType },
    });
    if (!destination)
      throw new NotFoundException(
        `Тип трансфера ${dto.transferType} не найден`,
      );

    const order = this.orderRepo.create({
      user,
      carClass,
      destination,
      withChild: dto.withChild ?? false,
      withSign: dto.withSign ?? false,
      hoursQuantity: dto.hoursQuantity,
      pickupLocation: dto.pickupLocation,
      dropoffLocation: dto.dropoffLocation,
      pickupDate: dto.pickupDate,
      pickupTime: dto.pickupTime,
      comment: dto.comment,
      name: dto.name,
      phone: dto.phone,
      price: dto.price,
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

  async findMyOrders(userId: number): Promise<OrderEntity[]> {
    return this.orderRepo.find({
      where: { user: { id: userId } },
      relations: ['carClass', 'destination'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateMyOrder(
    userId: number,
    orderId: number,
    dto: UpdateOrderDto,
  ): Promise<OrderEntity> {
    const order = await this.orderRepo.findOne({
      where: { id: orderId },
      relations: ['user'],
    });

    if (!order) throw new NotFoundException(`Заказ с id ${orderId} не найден`);
    if (order.user.id !== userId)
      throw new NotFoundException('Вы не можете редактировать этот заказ');

    Object.assign(order, dto);
    if (dto.transferType && dto.carClass) {
      const { price } = await this.priceService.calculatePrice({
        destination: dto.transferType,
        carClass: dto.carClass,
        withChild: dto.withChild ?? false,
        withSign: dto.withSign ?? false,
        hoursQuantity: dto.hoursQuantity ?? 1,
      });

      order.price = price;
    }

    return this.orderRepo.save(order);
  }
}
