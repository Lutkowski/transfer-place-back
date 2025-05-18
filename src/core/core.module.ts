import { Module } from '@nestjs/common';
import { CarsService } from './services/cars.service';
import { MinioService } from './services/minio.service.';

@Module({
  providers: [CarsService, MinioService],
  exports: [CarsService, MinioService],
})
export class CoreModule {}
