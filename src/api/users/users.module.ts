import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { StatusesModule } from '../statuses/statuses.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    NestjsFormDataModule,
    TypeOrmModule.forFeature([UsersRepository]),
    StatusesModule,
    RolesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
