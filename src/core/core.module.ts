import { Module } from '@nestjs/common';
import { CarsService } from './services/cars.service';
import { MinioService } from './services/minio.service.';
import { InfrastructureModule } from '../infra/infra.module';
import { PriceService } from './services/price.service';
import { FeedbackService } from './services/feedback.service';
import { SmsService } from './services/sms.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../infra/postgres/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    InfrastructureModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.getOrThrow<string>('JWT_EXPIRATION') },
      }),
    }),
  ],
  providers: [
    CarsService,
    MinioService,
    PriceService,
    FeedbackService,
    SmsService,
    AuthService,
    JwtStrategy,
  ],
  exports: [
    CarsService,
    MinioService,
    PriceService,
    FeedbackService,
    SmsService,
    AuthService,
    JwtModule,
    JwtStrategy,
  ],
})
export class CoreModule {}
