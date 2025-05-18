import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';

@Injectable()
export class MinioService {
  private client: Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      endPoint: this.configService.getOrThrow<string>('MINIO_ENDPOINT'),
      port: parseInt(
        this.configService.getOrThrow<string>('MINIO_PORT', '9000'),
        10,
      ),
      useSSL: false,
      accessKey: this.configService.getOrThrow<string>('MINIO_ACCESS_KEY'),
      secretKey: this.configService.getOrThrow<string>('MINIO_SECRET_KEY'),
    });
  }

  async uploadFile(bucket: string, file: Express.Multer.File): Promise<string> {
    const fileName = `${Date.now()}-${file.originalname}`;
    await this.client.putObject(bucket, fileName, file.buffer);
    return fileName;
  }

  async getFileUrl(bucket: string, fileName: string): Promise<string> {
    return this.client.presignedGetObject(bucket, fileName, 24 * 60 * 60); // Ссылка на 24 часа
  }
}
