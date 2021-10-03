import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { appConfig, databaseConfig, validate } from './config';
import { TypeOrmConfigService } from './services/typeorm-config.service';
import { StatusesModule } from './api/statuses/statuses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      expandVariables: true,
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfigService,
    }),
    StatusesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
