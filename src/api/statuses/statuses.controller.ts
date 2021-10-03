import { Controller, Get, Param } from '@nestjs/common';

import { StatusesService } from './statuses.service';

@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Get()
  findAll() {
    return this.statusesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusesService.findOne(+id);
  }
}
