import { TransferType } from '../enums/transfer-type.enum';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { CarClass } from '../enums/car-class.enum';

export class CreateOrderDto {
  @IsEnum(CarClass)
  carClass: CarClass;

  @IsEnum(TransferType)
  transferType: TransferType;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsBoolean()
  withChild?: boolean;

  @IsOptional()
  @IsBoolean()
  withSign?: boolean;

  @IsOptional()
  @IsInt()
  hoursQuantity?: number;
}
