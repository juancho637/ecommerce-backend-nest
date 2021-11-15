import { EntityRepository, Repository } from 'typeorm';

import { Status } from './entities/status.entity';
import { StatusAbbreviations } from './enums/status-abbreviations.enum';

@EntityRepository(Status)
export class StatusesRepository extends Repository<Status> {
  public async findOneByAbbreviation(
    abbreviation: StatusAbbreviations,
  ): Promise<Status> {
    return await this.findOne({ where: { abbreviation } });
  }
}
