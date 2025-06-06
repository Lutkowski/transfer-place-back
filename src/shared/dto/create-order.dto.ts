import { TransferType } from '../enums/transfer-type.enum';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsDateString,
  Matches,
} from 'class-validator';
import { CarClass } from '../enums/car-class.enum';

export class CreateOrderDto {
  @IsEnum(CarClass)
  carClass: CarClass;

  @IsEnum(TransferType)
  transferType: TransferType;

  @IsOptional()
  @IsBoolean()
  withChild?: boolean;

  @IsOptional()
  @IsBoolean()
  withSign?: boolean;

  @IsOptional()
  @IsInt()
  hoursQuantity?: number;

  @IsOptional()
  @IsString()
  pickupLocation?: string;

  @IsOptional()
  @IsString()
  dropoffLocation?: string;

  @IsOptional()
  @IsDateString()
  pickupDate?: string;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  pickupTime?: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsInt()
  price?: number;
}
