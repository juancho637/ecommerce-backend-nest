import { EntityRepository, Repository } from 'typeorm';

import { Role } from './entities/role.entity';
import { RoleNames } from './enums/role-names.enum';

@EntityRepository(Role)
export class RolesRepository extends Repository<Role> {
  public async findOneByName(name: RoleNames): Promise<Role> {
    return await this.findOne({ where: { name } });
  }
}
