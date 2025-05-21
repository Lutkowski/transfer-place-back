import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MinioService } from '../../core/services/minio.service.';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FileController {
  constructor(
    private readonly configService: ConfigService,
    private readonly minioService: MinioService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileName = await this.minioService.uploadFile(
      this.configService.getOrThrow('MINIO_BUCKET'),
      file,
    );
    return { fileName };
  }
}
