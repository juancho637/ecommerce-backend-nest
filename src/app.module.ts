import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { appConfig, validate } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      expandVariables: true,
      validate,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
