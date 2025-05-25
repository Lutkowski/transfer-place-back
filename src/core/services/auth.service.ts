import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SmsService } from './sms.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../infra/postgres/entities/user.entity';
import { SmsCodeEntity } from '../../infra/postgres/entities/sms-code.entity';
import { AdminLoginDto } from '../../shared/dto/admin-login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(SmsCodeEntity)
    private readonly codeRepo: Repository<SmsCodeEntity>,
    private readonly smsService: SmsService,
    private readonly jwtService: JwtService,
  ) {}

  async requestCode(phone: string): Promise<void> {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 1440 * 60 * 1000);

    await this.codeRepo.delete({ phone });

    const smsCode = this.codeRepo.create({ phone, code, expiresAt });
    await this.codeRepo.save(smsCode);

    await this.smsService.sendCode(phone, code);
  }

  async verifyCode(
    phone: string,
    code: string,
  ): Promise<{ access_token: string }> {
    const record = await this.codeRepo.findOneBy({ phone, code });

    if (!record || record.expiresAt < new Date()) {
      throw new UnauthorizedException('Неверный или просроченный код');
    }

    await this.codeRepo.delete({ id: record.id });

    let user = await this.userRepo.findOneBy({ phone });
    if (!user) {
      user = this.userRepo.create({ phone, isAdmin: false });
      await this.userRepo.save(user);
    }

    const payload = {
      id: user.id,
      phone: user.phone,
      name: user.name,
      isAdmin: user.isAdmin,
    };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }

  async loginByEmail(dto: AdminLoginDto): Promise<{ access_token: string }> {
    const user = await this.userRepo.findOneBy({ email: dto.email });

    if (!user) {
      throw new UnauthorizedException('Неверный email или нет доступа');
    }

    if (!user.isAdmin) {
      throw new ForbiddenException('Нет доступа админа');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password as string);
    if (!isMatch) {
      throw new UnauthorizedException('Неверный пароль');
    }

    const payload = {
      id: user.id,
      phone: user.phone,
      name: user.name,
      isAdmin: user.isAdmin,
    };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}
