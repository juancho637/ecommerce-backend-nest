import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { plainToClass } from 'class-transformer';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUsersDto } from './dto/filter-users.dto';
import { UsersSerializer } from './users.serializer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @FormDataRequest()
  async create(@Body() createUserDto: CreateUserDto) {
    const userSaved = await this.usersService.create(createUserDto);

    return plainToClass(UsersSerializer, userSaved);
  }

  @Get()
  findAll(@Query() filterUsersDto: FilterUsersDto) {
    const users = this.usersService.findAll(filterUsersDto);

    return plainToClass(UsersSerializer, users);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.findOne(id);

    return plainToClass(UsersSerializer, user);
  }

  @Patch(':id')
  @FormDataRequest()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userUpdated = this.usersService.update(id, updateUserDto);

    return plainToClass(UsersSerializer, userUpdated);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    const userDeleted = this.usersService.remove(id);

    return plainToClass(UsersSerializer, userDeleted);
  }
}
