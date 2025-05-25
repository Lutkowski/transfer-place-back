import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateCarDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsInt()
  placeNumber?: number;

  @IsOptional()
  @IsInt()
  carClassId?: number;

  @IsOptional()
  @IsString()
  imgSrc?: string;

  @IsOptional()
  @IsString()
  imgAlt?: string;
}
