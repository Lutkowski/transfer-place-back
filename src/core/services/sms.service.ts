import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmsService {
  private readonly email: string;
  private readonly apiKey: string;
  private readonly sign: string;

  constructor(private config: ConfigService) {
    this.email = this.config.getOrThrow<string>('SMS_AERO_EMAIL');
    this.apiKey = this.config.getOrThrow<string>('SMS_AERO_API_KEY');
    this.sign = this.config.getOrThrow<string>('SMS_AERO_SIGN');
  }

  async sendCode(phone: string, code: string) {
    const formattedPhone = phone.replace(/^\+/, '');
    const url = 'https://gate.smsaero.ru/v2/sms/send';

    await axios.get(url, {
      params: {
        number: formattedPhone,
        text: `Ваш код: ${code}`,
        sign: this.sign,
        channel: 'DIRECT',
      },
      auth: {
        username: this.email,
        password: this.apiKey,
      },
    });
  }
}
