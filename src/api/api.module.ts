import { Module } from '@nestjs/common';
import { CarsController } from './controllers/cars.controller';
import { FileController } from './controllers/minio.controller';
import { CoreModule } from '../core/core.module';
import { PriceController } from './controllers/price.controller';
import { FeedbackController } from './controllers/feedback.controller';

@Module({
  imports: [CoreModule],
  controllers: [
    CarsController,
    FileController,
    PriceController,
    FeedbackController,
  ],
})
export class ApiModule {}
