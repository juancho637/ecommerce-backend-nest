import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { StatusesRepository } from './statuses.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StatusesRepository])],
  controllers: [StatusesController],
  providers: [StatusesService],
  exports: [TypeOrmModule],
})
export class StatusesModule {}
