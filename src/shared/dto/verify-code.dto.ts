import { IsString, IsPhoneNumber, Length } from 'class-validator';

export class VerifyCodeDto {
  @IsPhoneNumber('RU')
  phone: string;

  @IsString()
  @Length(4, 6)
  code: string;
}
