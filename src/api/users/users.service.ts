import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { StatusesRepository } from '../statuses/statuses.repository';
import { RolesRepository } from '../roles/roles.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterService } from '../common/services/filter.service';
import { FilterUsersDto } from './dto/filter-users.dto';
import { StatusAbbreviations } from '../statuses/enums/status-abbreviations.enum';
import { PaginatedResourceResultDto } from '../common/dto/paginated-resource-result.dto';

@Injectable()
export class UsersService extends FilterService<User, FilterUsersDto> {
  constructor(
    private usersRepository: UsersRepository,
    private statusesRepository: StatusesRepository,
    private rolesRepository: RolesRepository,
  ) {
    super();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);

    newUser.status = await this.statusesRepository.findOne({
      where: { abbreviation: StatusAbbreviations.GEN_ACTIVE_STATUS },
    });

    newUser.roles = await this.rolesRepository.findByIds(createUserDto.roles);

    return await this.usersRepository.save(newUser);
  }

  async findAll(
    filterUsersDto: FilterUsersDto,
  ): Promise<PaginatedResourceResultDto<User>> {
    const filterOptions = this.filterByParams(filterUsersDto);
    const usersResult = await this.usersRepository.findAndCount(filterOptions);
    const users = usersResult[0];
    const count = usersResult[1];
    const page = filterUsersDto.page ?? 1;
    const limit = Math.ceil(count / filterOptions.take);

    return {
      data: users,
      page,
      limit,
      totalCount: count,
    };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id, {
      relations: ['roles', 'status'],
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    if (updateUserDto.status) {
      const status = await this.statusesRepository.findOne(
        updateUserDto.status,
      );
      user.status = status;
    }

    if (updateUserDto.roles) {
      const roles = await this.rolesRepository.findByIds(updateUserDto.roles);
      user.roles = roles;
    }

    this.usersRepository.merge(user, updateUserDto);

    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    if (await this.usersRepository.delete(id)) {
      return user;
    }
  }
}
