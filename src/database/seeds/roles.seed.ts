import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Role } from '../../api/roles/entities/role.entity';

export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([
        { name: 'administrator', description: 'admin of application' },
        { name: 'customer', description: 'customer of application' },
      ])
      .execute();
  }
}
