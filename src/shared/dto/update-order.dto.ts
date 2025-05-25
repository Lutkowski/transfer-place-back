import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { TransferType } from '../enums/transfer-type.enum';
import { CarClass } from '../enums/car-class.enum';

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(CarClass)
  carClass?: CarClass;

  @IsOptional()
  @IsEnum(TransferType)
  transferType?: TransferType;

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

  @IsOptional()
  @IsString()
  name?: string;
}
