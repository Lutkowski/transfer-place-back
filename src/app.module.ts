import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ApiModule } from './api/api.module';
import { CoreModule } from './core/core.module';
import { InfrastructureModule } from './infra/infra.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: config.getOrThrow<string>('DB_HOST'),
        port: +config.getOrThrow<number>('DB_PORT'),
        username: config.getOrThrow<string>('DB_USER'),
        password: config.getOrThrow<string>('DB_PASS'),
        database: config.getOrThrow<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
        migrations: ['dist/infra/postgres/migrations/*.js'],
        migrationsRun: true,
      }),
    }),
    ApiModule,
    CoreModule,
    InfrastructureModule,
  ],
})
export class AppModule {}
