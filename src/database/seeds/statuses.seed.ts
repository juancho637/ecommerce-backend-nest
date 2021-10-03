import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Status } from '../../api/statuses/entities/status.entity';

export default class CreateStatuses implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Status)
      .values([
        {
          type: 'general',
          abbreviation: 'gen-act',
          description: 'active resource',
        },
        {
          type: 'general',
          abbreviation: 'gen-inact',
          description: 'inactive resource',
        },
      ])
      .execute();
  }
}
