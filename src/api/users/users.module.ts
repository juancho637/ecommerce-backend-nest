import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { StatusesModule } from '../statuses/statuses.module';
import { RolesModule } from '../roles/roles.module';
import { IsRolesAlreadyExistConstraint } from './decorators/is-roles-already-exist.decorator';
import { IsUserAlreadyExistConstraint } from './decorators/is-user-already-exist.decorator';
import { IsStatusAlreadyExistConstraint } from './decorators/is-status-already-exist.decorator';

@Module({
  imports: [
    NestjsFormDataModule,
    TypeOrmModule.forFeature([UsersRepository]),
    StatusesModule,
    RolesModule,
  ],
  controllers: [UsersController],
  providers: [
    IsUserAlreadyExistConstraint,
    IsRolesAlreadyExistConstraint,
    IsStatusAlreadyExistConstraint,
    UsersService,
  ],
  exports: [TypeOrmModule],
})
export class UsersModule {}
