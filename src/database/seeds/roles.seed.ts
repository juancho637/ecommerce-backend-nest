import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { Role } from '../../api/roles/entities/role.entity';
import { RoleNames } from '../../api/roles/enums/role-names.enum';

export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([
        {
          name: RoleNames.ADMIN_ROLE,
          description: 'admin of application',
        },
        {
          name: RoleNames.CUSTOMER_ROLE,
          description: 'customer of application',
        },
      ])
      .execute();
  }
}
