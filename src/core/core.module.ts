import { Module } from '@nestjs/common';
import { CarsService } from './services/cars.service';
import { MinioService } from './services/minio.service.';
import { InfrastructureModule } from '../infra/infra.module';

@Module({
  imports: [InfrastructureModule],
  providers: [CarsService, MinioService],
  exports: [CarsService, MinioService],
})
export class CoreModule {}
