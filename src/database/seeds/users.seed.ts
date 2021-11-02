import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { Role } from '../../api/roles/entities/role.entity';
import { RoleNames } from '../../api/roles/enums/role-names.enum';
import { User } from '../../api/users/entities/user.entity';
import { Status } from '../../api/statuses/entities/status.entity';
import { StatusAbbreviations } from '../../api/statuses/enums/status-abbreviations.enum';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const em = connection.createEntityManager();

    const activeStatus = await em.findOne(Status, {
      where: { abbreviation: StatusAbbreviations.GEN_ACTIVE_STATUS },
    });

    const adminRole = await em.findOne(Role, {
      where: { name: RoleNames.ADMIN_ROLE },
    });
    const adminUser = new User();
    adminUser.fullName = 'Juan David Garcia';
    adminUser.email = 'juancho637@gmail.com';
    adminUser.password = 'secret';
    adminUser.status = activeStatus;
    adminUser.roles = [adminRole];
    await em.save(adminUser);

    const customerRole = await em.findOne(Role, {
      where: { name: RoleNames.CUSTOMER_ROLE },
    });
    const customerUser = new User();
    customerUser.fullName = 'customer1';
    customerUser.email = 'customer1@example.com';
    customerUser.password = 'secret';
    customerUser.status = activeStatus;
    customerUser.roles = [customerRole];
    await em.save(customerUser);
  }
}
