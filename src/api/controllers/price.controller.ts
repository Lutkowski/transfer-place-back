import { Body, Controller, Get, Post } from '@nestjs/common';
import { CalculatePriceDto } from '../../shared/dto/calculate-price.dto';
import { PriceService } from '../../core/services/price.service';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Post('calculate')
  calculate(@Body() dto: CalculatePriceDto) {
    return this.priceService.calculatePrice(dto);
  }

  @Get()
  getAllPrices() {
    return this.priceService.getAllPrices();
  }
}
