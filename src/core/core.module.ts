import { Module } from '@nestjs/common';
import { CarsService } from './services/cars.service';
import { MinioService } from './services/minio.service.';
import { InfrastructureModule } from '../infra/infra.module';
import { PriceService } from './services/price.service';

@Module({
  imports: [InfrastructureModule],
  providers: [CarsService, MinioService, PriceService],
  exports: [CarsService, MinioService, PriceService],
})
export class CoreModule {}
