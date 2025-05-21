import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCarDto {
  @IsString()
  title: string;

  @IsInt()
  @IsOptional()
  placeNumber?: number = 3;

  @IsInt()
  carClassId: number;

  @IsString()
  @IsOptional()
  imgSrc: string;

  @IsString()
  @IsOptional()
  imgAlt: string;
}
