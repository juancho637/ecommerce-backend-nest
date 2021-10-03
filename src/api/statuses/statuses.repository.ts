import { EntityRepository, Repository } from 'typeorm';
import { Status } from './entities/status.entity';

@EntityRepository(Status)
export class StatusesRepository extends Repository<Status> {}
