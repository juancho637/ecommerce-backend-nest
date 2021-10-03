import { Injectable } from '@nestjs/common';

import { StatusesRepository } from './statuses.repository';

@Injectable()
export class StatusesService {
  constructor(private statusesRepository: StatusesRepository) {}

  findAll() {
    return `This action returns all statuses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} status`;
  }
}
