import { OrderEntity } from '../../infra/postgres/entities/order.entity';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from '../../core/services/order.service';
import { CreateOrderDto } from '../../shared/dto/create-order.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../../shared/types/user.interface';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateOrderDto,
  ): Promise<OrderEntity> {
    const userId = req.user.id;
    return this.orderService.create(userId, dto);
  }

  @Get()
  async findAll(): Promise<OrderEntity[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<OrderEntity> {
    return this.orderService.findOne(id);
  }
}
