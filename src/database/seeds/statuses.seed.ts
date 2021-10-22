import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { Status } from '../../api/statuses/entities/status.entity';
import { StatusNames } from '../../api/statuses/enums/status-names.enum';
import { StatusTypes } from '../../api/statuses/enums/status-types.enum';
import { StatusAbbreviations } from '../../api/statuses/enums/status-abbreviations.enum';

export default class CreateStatuses implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Status)
      .values([
        {
          name: StatusNames.GEN_ACTIVE_STATUS,
          type: StatusTypes.GENERAL_STATUSES,
          abbreviation: StatusAbbreviations.GEN_ACTIVE_STATUS,
          description: 'active resource',
        },
        {
          name: StatusNames.GEN_INACTIVE_STATUS,
          type: StatusTypes.GENERAL_STATUSES,
          abbreviation: StatusAbbreviations.GEN_INACTIVE_STATUS,
          description: 'inactive resource',
        },
      ])
      .execute();
  }
}
