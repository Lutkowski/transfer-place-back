import { OrderEntity } from '../../infra/postgres/entities/order.entity';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from '../../core/services/order.service';
import { CreateOrderDto } from '../../shared/dto/create-order.dto';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../../shared/types/user.interface';
import { UpdateOrderDto } from '../../shared/dto/update-order.dto';

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
  @Get('my')
  async getMyOrders(@Req() req: AuthenticatedRequest): Promise<OrderEntity[]> {
    const userId = req.user.id;
    return this.orderService.findMyOrders(userId);
  }

  @Get()
  async findAll(): Promise<OrderEntity[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<OrderEntity> {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  async updateMyOrder(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderDto,
  ): Promise<OrderEntity> {
    const userId = req.user.id;
    return this.orderService.updateMyOrder(userId, id, dto);
  }
}
