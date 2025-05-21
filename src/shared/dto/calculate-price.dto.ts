import { IsBoolean, IsEnum, IsInt, IsOptional } from 'class-validator';
import { CarClass } from '../enums/car-class.enum';
import { TransferType } from '../enums/transfer-type.enum';

export class CalculatePriceDto {
  @IsEnum(TransferType)
  destination: TransferType;

  @IsEnum(CarClass)
  carClass: CarClass;

  @IsBoolean()
  @IsOptional()
  withChild?: boolean = false;

  @IsBoolean()
  @IsOptional()
  withSign?: boolean = false;

  @IsInt()
  @IsOptional()
  hoursQuantity?: number = 1;
}
