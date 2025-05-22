import { Module } from '@nestjs/common';
import { CarsController } from './controllers/cars.controller';
import { FileController } from './controllers/minio.controller';
import { CoreModule } from '../core/core.module';
import { PriceController } from './controllers/price.controller';
import { FeedbackController } from './controllers/feedback.controller';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../infra/postgres/entities/user.entity';

@Module({
  imports: [CoreModule, TypeOrmModule.forFeature([UserEntity]), CoreModule],
  controllers: [
    CarsController,
    FileController,
    PriceController,
    FeedbackController,
    AuthController,
  ],
})
export class ApiModule {}
