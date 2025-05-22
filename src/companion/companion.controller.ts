// src/companion/companion.controller.ts
import { Body, Controller, Post } from '@nestjs/common';

import { CompanionService } from './companion.service';
import { companion_CreateDto } from './dto/companion.dto';

@Controller('companion')
export class CompanionController {
  constructor(private readonly companionService: CompanionService) {}

  @Post('create')
  async create(@Body() dto: companion_CreateDto) {
    await this.companionService.create(dto);
    return { message: 'Companion created successfully.' };
  }
}
