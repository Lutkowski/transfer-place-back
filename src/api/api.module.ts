import { Module } from '@nestjs/common';
import { CarsController } from './controllers/cars.controller';
import { FileController } from './controllers/minio.controller';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [CarsController, FileController],
})
export class ApiModule {}
