import { IsString, Length } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @Length(2, 100)
  name: string;

  @IsString()
  phone: string;

  @IsString()
  message: string;
}
