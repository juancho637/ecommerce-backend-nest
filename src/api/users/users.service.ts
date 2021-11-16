import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { Status } from '../statuses/entities/status.entity';
import { Role } from '../roles/entities/role.entity';
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
    const salt = await bcrypt.genSalt(10);
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    const userByEmail = await this.usersRepository.findOneByEmail(
      createUserDto.email,
    );

    if (userByEmail) {
      throw new BadRequestException(
        `The email given (${createUserDto.email}) is alredy exist`,
      );
    }

    const roles = await this.rolesRepository.findByIds(createUserDto.roles);

    if (createUserDto.roles.length !== roles.length) {
      throw new BadRequestException(
        `One of given roles (${createUserDto.roles.toString()}) does not exist in the application`,
      );
    }

    const newUser = this.usersRepository.create({ ...createUserDto, roles });

    newUser.status = await this.statusesRepository.findOneByAbbreviation(
      StatusAbbreviations.GEN_ACTIVE_STATUS,
    );

    newUser.roles = roles;

    return await this.usersRepository.save(newUser);
  }

  async findAll(
    filterUsersDto: FilterUsersDto,
  ): Promise<PaginatedResourceResultDto<User>> {
    const filterOptions = this.filterByParams(filterUsersDto);
    const [users, count] = await this.usersRepository.findAndCount(
      filterOptions,
    );
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
    const { roles, status, email } = updateUserDto;
    let findStatus: Status | undefined;
    let findRoles: Role[] | undefined;

    if (email) {
      const user = await this.usersRepository.findOneByEmail(email);

      if (user) {
        throw new BadRequestException(
          `The email given (${email}) is alredy exist`,
        );
      }
    }

    if (status) {
      findStatus = await this.statusesRepository.findOne(status);

      if (!findStatus) {
        throw new BadRequestException(
          `Status (${updateUserDto.status}) does not exist in the application`,
        );
      }

      user.status = findStatus;
    }

    if (roles) {
      findRoles = await this.rolesRepository.findByIds(roles);

      if (updateUserDto.roles.length !== roles.length) {
        throw new BadRequestException(
          `One of given roles (${updateUserDto.roles.toString()}) does not exist in the application`,
        );
      }

      user.roles = findRoles;
    }

    const userUpdated = this.usersRepository.merge(user, {
      ...updateUserDto,
      roles: findRoles,
      status: findStatus,
    });

    return this.usersRepository.save(userUpdated);
  }

  async remove(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    if (await this.usersRepository.delete(id)) {
      return user;
    }
  }
}
