import { Module } from '@nestjs/common';
import { CarsService } from './services/cars.service';
import { MinioService } from './services/minio.service.';
import { InfrastructureModule } from '../infra/infra.module';
import { PriceService } from './services/price.service';
import { FeedbackService } from './services/feedback.service';

@Module({
  imports: [InfrastructureModule],
  providers: [CarsService, MinioService, PriceService, FeedbackService],
  exports: [CarsService, MinioService, PriceService, FeedbackService],
})
export class CoreModule {}
